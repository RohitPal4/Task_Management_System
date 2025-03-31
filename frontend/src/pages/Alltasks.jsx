import React, { useState, useEffect } from "react";
import Cards from "../components/home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/home/InputData";
import axios from "axios";

const Alltasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
