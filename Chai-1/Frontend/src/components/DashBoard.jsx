import React, {useState} from 'react'
import PopupModal from './PopupModal';
import AddCard from './AddCard.jsx';
import NavBar from './NavBar';

function DashBoard() {
    const [popup,setPopup] = useState(false);
    const [title,setTitle] = useState("")
    const [task,setTask] = useState([]);
    const handleSubmit = (newTask) => {
        setTask((prev) => [...prev, {id:Date.now(), ...newTask}])
    }
  return (
    <div className='flex'>
    <NavBar/>
    
    <div className='text-blue-500 flex-1 p-6'>
        <h1 className='text-left text-3xl font-bold'>Home</h1>
        <div className='flex items-center justify-center gap-4 mt-15'>
            <input type="text" placeholder='Enter a task' className='text-white p-3 w-100 border-1 rounded-2xl' onChange={(e)=>setTitle(e.target.value)} />
            <button className='font-medium border-1 p-3 rounded-2xl bg-blue-500 text-black hover:bg-blue-300 hover:scale-105 hover:cursor-pointer' onClick={()=>setPopup(true)}>Add Task</button>

        </div>
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {task.map((t)=>(
               
                    <AddCard key={t.id} task={t} />
                    
          
            
            ))}
            
        </div>
        {popup && 

           <PopupModal isOpen={popup} onClose={()=>setPopup(false)} onSubmit={handleSubmit} title={title}/>
        
        }



      
    </div>
    </div>
  )
}

export default DashBoard;
