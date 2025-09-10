import { useState } from 'react'
import DashBoard from './components/DashBoard.jsx'
import Navbar from './components/NavBar.jsx'
import {Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login.jsx'
import Analytics from './pages/Analytics.jsx'

function App() {
  const token = localStorage.getItem('token')

  return (
    <>
    <div className=' min-h-screen bg-gray-900'>
      
      
    
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          {token && <Route path='/home' element={<DashBoard/>}/>}
          <Route path='/analytics' element={<Analytics/>}/>
        </Routes>
      {/* <Navbar/>
      <main className='flex-1 p-6'>
        <DashBoard/>

      </main> */}

    </div>

      
    </>
      
  )
}

export default App
