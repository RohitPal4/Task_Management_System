import React, { useState, useEffect } from "react";
import Cards from "../components/home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/home/InputData";
import axios from "axios";

const Alltasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token && id) {
        const response = await axios.get(
          `https://task-management-system-qzbh.onrender.com/api/v2/get-all-tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data.data.tasks || []);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => {
            setEditingTask(null);
            setInputDiv("fixed");
          }}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        <Cards 
          home={"true"} 
          setInputDiv={setInputDiv} 
          data={tasks}
          setEditingTask={setEditingTask}
          refreshTasks={fetchTasks}
        />
      </div>

      <InputData 
        inputDiv={inputDiv} 
        setInputDiv={setInputDiv} 
        refreshTasks={fetchTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
    </>
  );
};

export default Alltasks;
