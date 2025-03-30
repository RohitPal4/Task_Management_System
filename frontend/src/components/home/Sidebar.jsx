import React, { useEffect, useState } from "react";
import { CgNotes, CgMenu } from "react-icons/cg"; // Added CgMenu for hamburger icon
import { MdLabelImportant, MdClose } from "react-icons/md"; // Added MdClose for close icon
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
// import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    incomplete: 0,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      link: "/importanttasks",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      link: "/completedtasks",
    },
    {
      title: "Incompleted tasks",
      icon: <TbNotebookOff />,
      link: "/incompletedtasks",
    },
  ];

  const [Data, setData] = useState();

  const logout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    // Update Redux state
    dispatch(authActions.logout());

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        if (token && id) {
          const response = await axios.get(
            `http://localhost:1000/api/v2/get-all-tasks`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setData(response.data.data);
          const tasks = response.data.data.tasks || [];
          setStats({
            total: tasks.length,
            completed: tasks.filter((task) => task.complete).length,
            incomplete: tasks.filter((task) => !task.complete).length,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button
        className="md:hidden p-2 text-2xl"
        onClick={() => setMobileMenuOpen(true)}
      >
        <CgMenu />
      </button>
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex md:flex-col justify-between h-full">
        {Data && (
          <div>
            <h2 className="text-xl font-semibold">{Data.username}</h2>
            <h4 className="my-1 text-gray-400">{Data.email}</h4>
            <hr />

            <div className="my-4">
              <div className="flex justify-between py-1">
                <span>Total Tasks:</span>
                <span className="font-bold">{stats.total}</span>
              </div>
              <div className="flex justify-between py-1 text-green-500">
                <span>Completed:</span>
                <span className="font-bold">{stats.completed}</span>
              </div>
              <div className="flex justify-between py-1 text-red-500">
                <span>Incomplete:</span>
                <span className="font-bold">{stats.incomplete}</span>
              </div>
            </div>
            <hr />
          </div>
        )}

        <div>
          {data.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="my-2 flex items-center hover:bg-gray-700 p-2 rounded transition-all duration-300"
            >
              {item.icon}&nbsp;&nbsp;{item.title}
            </Link>
          ))}
        </div>

        <div>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (visible only on small screens when open) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 z-50 p-4">
          <div className="flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl p-2"
            >
              <MdClose />
            </button>
          </div>

          {Data && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{Data.username}</h2>
              <h4 className="my-1 text-gray-400">{Data.email}</h4>
              <hr />
            </div>
          )}

          <div className="flex flex-col">
            {data.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                className="my-2 flex items-center hover:bg-gray-700 p-2 rounded transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}&nbsp;&nbsp;{item.title}
              </Link>
            ))}
          </div>

          <div className="my-4">
              <div className="flex justify-between py-1">
                <span>Total Tasks:</span>
                <span className="font-bold">{stats.total}</span>
              </div>
              <div className="flex justify-between py-1 text-green-500">
                <span>Completed:</span>
                <span className="font-bold">{stats.completed}</span>
              </div>
              <div className="flex justify-between py-1 text-red-500">
                <span>Incomplete:</span>
                <span className="font-bold">{stats.incomplete}</span>
              </div>
            </div>
            <hr />

          <div className="mt-4">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-full"
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
