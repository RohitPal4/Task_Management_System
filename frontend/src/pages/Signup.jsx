import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
const Signup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }


  const change = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value});

  };
  const submit = async () => {
    try {
      if(!data.username || !data.email || !data.password) {
        alert("Please fill all the fields");
        return;
      }
      const response  = await axios.post("https://task-management-system-qzbh.onrender.com/api/v1/sign-in", data);
      setData({
        username: "",
        email: "",
        password: "",
      });
      alert(response.data.message);
      navigate("/login");
      
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="h-screen md:h-[98vh] flex items-center justify-center px-4"c>
      <div className="p-4 w-full md:w-2/3 lg:w-1/2 xl:w-2/6 rounded bg-gray-800">
        <div className="text-xl font-semibold">Signup</div>
        <input
          type="username"
          name="username"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          value={data.username}
          required
          onChange={change}
        />
        <input
          type="email"
          name="email"
          placeholder="xyz@example.com"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          value={data.email}
          required
          onChange={change}

        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          value={data.password}
          required
          onChange={change}

        />
        <div className="w-full flex items-center justify-between">
          <button className="bg-blue-400 px-3 py-2 text-black text-xl rounded hover:bg-blue-700"
          onClick={submit}
          >
            Signup
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-700">
            Already have an account login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
