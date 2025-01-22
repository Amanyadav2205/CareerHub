import  Header  from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className=''>
   <div className="grid-background bg-gradient-to-b from-orange-300 via-red-400 to-stone-800"></div>


      <main className='min-h-screen'>
      <Header/>
      <Outlet/>
      </main > 
      <div className='footer p-10 text-center bg-black  text-white font-serif'>
        Copyright @ CareerHub 2025
      </div>
    </div>
  )
}

export default AppLayout
