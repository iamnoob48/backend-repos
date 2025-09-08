import React from 'react'

function Icons({icons}) {
  return (

        <button className='flex items-center space-x-3 text-blue-400 hover:text-blue-300 hover:scale-105 hover:cursor-pointer transition'>
            <span>{icons}</span>
        </button>

  )
}

export default Icons
