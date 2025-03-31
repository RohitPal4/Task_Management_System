import React, { useEffect } from 'react'
import {Routes, Route, useNavigate } from "react-router-dom";

import Home from './pages/Home'
import Alltasks from './pages/Alltasks';
import Importanttasks from './pages/Importanttasks';
import Completedtasks from './pages/Completedtasks';
import Incompletedtasks from './pages/Incompletedtasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { statsActions } from './store/stats';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('id')) {
      dispatch(authActions.login());
      dispatch(statsActions.setStats({
        total: 0,
        completed: 0,
        incomplete: 0
      }));
    }else {
      dispatch(authActions.logout());
      dispatch(statsActions.resetStats())
    }
    if(!isLoggedIn) {
      navigate("/login");
    }
  
  },[]);
  
  
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
        <Routes>
          <Route exact path='/' element={<Home />}>
            <Route index element={<Alltasks />} />
            <Route path='/importanttasks' element={<Importanttasks />} />
            <Route path='/completedtasks' element={<Completedtasks />} />
            <Route path='/incompletedtasks' element={<Incompletedtasks />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      

    </div>
  )
}

export default App