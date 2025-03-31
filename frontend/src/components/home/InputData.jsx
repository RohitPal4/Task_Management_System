import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ inputDiv, setInputDiv, refreshTasks, editingTask, setEditingTask }) => {
  const [data, setData] = useState({ title: "", desc: "" });
  const [loading, setLoading] = useState(false);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (editingTask) {
      setData({ title: editingTask.title, desc: editingTask.desc });
    } else {
      setData({ title: "", desc: "" });
    }
  }, [editingTask]);

  const change = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    try {
      if (!data.title.trim() || !data.desc.trim()) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);
      
      if (editingTask) {
        // Update existing task
        await axios.put(
          `https://task-management-system-qzbh.onrender.com/api/v2/update-task/${editingTask._id}`,
          {
            title: data.title,
            desc: data.desc,
          },
          { headers }
        );
      } else {
        // Create new task
        await axios.post(
          "https://task-management-system-qzbh.onrender.com/api/v2/create-task",
          {
            title: data.title,
            desc: data.desc,
          },
          { headers }
        );
      }

      refreshTasks();
      setInputDiv("hidden");
      setEditingTask(null);
      setData({ title: "", desc: "" });
    } catch (error) {
      console.error("Operation failed:", error);
      alert("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${inputDiv} fixed top-0 left-0 bg-gray-500 opacity-80 h-screen w-full z-40`}></div>
      <div className={`${inputDiv} fixed top-0 left-0 bg-gray-500 opacity-80 h-screen w-full z-40`}>
        <div className="w-full max-w-md bg-gray-900 p-4 md:p-6 rounded-lg relative mx-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>
            <button 
              className="text-2xl"
              onClick={() => {
                setInputDiv("hidden");
                setEditingTask(null);
              }}
              disabled={loading}
            >
              <RxCross2 />
            </button>
          </div>

          <form onSubmit={submitData}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="px-3 py-2 rounded w-full bg-gray-700 mb-4"
              value={data.title}
              onChange={change}
              disabled={loading}
            />

            <textarea
              name="desc"
              placeholder="Description..."
              className="px-3 py-2 rounded w-full bg-gray-700 mb-4"
              rows={6}
              value={data.desc}
              onChange={change}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded w-full ${
                loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold`}
            >
              {loading ? "Processing..." : (editingTask ? "Update Task" : "Add Task")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputData;
