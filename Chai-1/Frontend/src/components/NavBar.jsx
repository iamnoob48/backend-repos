import React from 'react'
import {Home, BarChart, User, LogOut} from "lucide-react"
import Icons from './Icons'

function NavBar() {
  return (
   
        
        <nav className='min-h-screen w-20 md:w-30 bg-gray-800 border-blue-500 flex flex-col items-center py-6 space-y-8'>
            <div className='flex flex-col space-y-10'>
            
                <Icons icons = {<Home/>}/>
                <Icons icons = {<BarChart/>}/>
                <Icons icons = {<User/>}/>
                <Icons icons = {<LogOut/>}/>

            </div>
        </nav>

      
  )
}

export default NavBar
