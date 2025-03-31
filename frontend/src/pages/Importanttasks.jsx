import React, { useEffect, useState } from "react";
import Cards from "../components/home/Cards";
import InputData from "../components/home/InputData"; // Add this import
import axios from "axios";

const Importanttasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputDiv, setInputDiv] = useState("hidden");
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      if (token && id) {
        const response = await axios.get(
          `https://task-management-system-qzbh.onrender.com/api/v2/get-imp-tasks`,
          {
            headers: {
              id: id,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data.data?.tasks || response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching important tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">⭐ Important Tasks</h1>
      <Cards 
        home={"false"} 
        data={tasks} 
        setInputDiv={setInputDiv}
        setEditingTask={setEditingTask}
        refreshTasks={fetchTasks}
      />
      
      {/* Add the InputData component */}
      <InputData 
        inputDiv={inputDiv} 
        setInputDiv={setInputDiv} 
        refreshTasks={fetchTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
    </div>
  );
};

export default Importanttasks;
