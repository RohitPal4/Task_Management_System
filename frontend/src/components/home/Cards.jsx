import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setEditingTask, refreshTasks }) => {
  const [localdata, setLocalData] = useState([]);
  
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleClick = async (id) => {
    try {
      const response = await axios.put(
        `https://task-management-system-qzbh.onrender.com/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );

      if (response.status === 200) {
        refreshTasks();
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleImpTask = async (id) => {
    try {
      const response = await axios.put(
        `https://task-management-system-qzbh.onrender.com/api/v2/update-imp-Task/${id}`,
        {},
        { headers }
      );

      if (response.status === 200) {
        refreshTasks();
        if (home === "false") {
          setLocalData(prev => prev.filter(task => task._id !== id));
        }
      }
    } catch (error) {
      console.error("Failed to update important status:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://task-management-system-qzbh.onrender.com/api/v2/delete-task/${id}`,
        { headers }
      );

      if (response.status === 200) {
        refreshTasks();
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleUpdate = (id) => {
    const taskToUpdate = localdata.find((item) => item._id === id);
    if (taskToUpdate) {
      setEditingTask(taskToUpdate);
      setInputDiv("fixed");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 md:p-4">
      {localdata &&
        localdata.map((item) => (
          <div key={item._id} className="flex flex-col justify-between bg-gray-800 rounded-sm p-3 md:p-4"
          style={{ minHeight: '12rem' }}
          >
            <div className="overflow-y-auto">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300 my-2">{item.desc}</p>
            </div>

            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  item.complete === false ? "bg-red-500" : "bg-green-800"
                } p-2 rounded`}
                onClick={() => handleClick(item._id)}
              >
                {item.complete === false ? "Incomplete" : "Completed"}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                <button onClick={() => handleImpTask(item._id)}>
                  {item.important ? (
                    <FaHeart className="text-rose-500" />
                  ) : (
                    <CiHeart />
                  )}
                </button>
                <button onClick={() => handleUpdate(item._id)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteTask(item._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button 
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 cursor-pointer transition-all duration-300" 
          onClick={() => {
            setEditingTask(null);
            setInputDiv("fixed");
          }}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
