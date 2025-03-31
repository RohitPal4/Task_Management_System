import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  
  const dispatch = useDispatch();
  
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value});

  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  const submit = async () => {
    try {
      if(!data.username || !data.password) {
        alert("Please fill all the fields");
        return;
      }
      const response  = await axios.post("https://task-management-system-qzbh.onrender.com/api/v1/login", data);
      setData({
        username: "",
        password: "",
      });
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className='text-xl font-semibold'>Login</div>
        <input
          type="text"
          name="username"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          value={data.username}
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

      <div className='w-full flex items-center justify-between'>
      <button className="bg-blue-400 px-3 py-2 text-black text-xl rounded hover:bg-blue-700"
      onClick={submit}
      >Login</button>
      <Link to="/signup" className='text-gray-400 hover:text-gray-700'>Not have account signup here</Link>
      </div>
      </div>
    </div>
  )
}

export default Login
