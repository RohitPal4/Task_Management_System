import React from 'react'
import Sidebar from '../components/home/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col md:flex-row h-[98vh] gap-4 p-2 md:p-0'>
    {/* Sidebar - becomes horizontal on mobile */}
    <div className='w-full md:w-1/6 border border-gray-500 rounded-xl p-2 md:p-4 flex flex-row md:flex-col justify-between md:justify-start'>
      <Sidebar />
    </div>
    
    {/* Main Content */}
    <div className='w-full md:w-5/6 border border-gray-500 rounded-xl p-2 md:p-4 overflow-y-auto'>
      <Outlet />
    </div>
  </div>
  )
}

export default Home