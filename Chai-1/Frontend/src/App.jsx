import { useState } from 'react'
import DashBoard from './components/DashBoard.jsx'
import Navbar from './components/NavBar.jsx'
import {Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login.jsx'

function App() {

  return (
    <>
    <div className=' min-h-screen bg-gray-900'>
      
      
    
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<DashBoard/>}/>
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
