import React, { useEffect, useState } from 'react';
import Cards from '../components/home/Cards';
import InputData from '../components/home/InputData';
import axios from 'axios';

const Incompletedtasks = () => {
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
          `http://localhost:1000/api/v2/get-incomplete-tasks`,
          {
            headers: {
              id: id,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Handle both possible response structures
        setTasks(response.data.data?.tasks || response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching incomplete tasks:", error);
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
      <h1 className="text-2xl font-bold mb-4">📝 Incomplete Tasks</h1>
      <Cards 
        home={"false"} 
        data={tasks} 
        setInputDiv={setInputDiv}
        setEditingTask={setEditingTask}
        refreshTasks={fetchTasks}
      />
      
      {/* InputData modal for editing */}
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

export default Incompletedtasks;