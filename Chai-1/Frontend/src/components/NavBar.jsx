import React from 'react'
import {Home, BarChart, User, LogOut} from "lucide-react"
import Icons from './Icons'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')

  }
  return (
   
        
        <nav className='min-h-screen w-20 md:w-30 bg-gray-800 border-blue-500 flex flex-col items-center py-6 space-y-8'>
            <div className='flex flex-col space-y-10'>
            
                <Link to={'/home'}><Icons icons = {<Home/>}/></Link>
                <Link to={'/analytics'}>
                <Icons icons = {<BarChart/>}/>
                </Link>
                
                <Icons icons = {<User/>}/>
                <button onClick={logout}><Icons icons = {<LogOut/>} /></button>
                

            </div>
        </nav>

      
  )
}

export default NavBar
