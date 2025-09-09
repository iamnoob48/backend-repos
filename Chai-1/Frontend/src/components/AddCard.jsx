import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card.jsx"
import { useState } from "react";

function AddCard({ task, update, deletedFun}) {
  const [done, setDone] = useState(task.completed);
  const [deleted, setDeleted] = useState(task.isDeleted);
  const date = new Date(task.dueDate).toISOString().split("T")[0]

  const handleUpdate = () => {
    const newDone = true
    setDone(newDone);
    update({completed : done}, task.id);
  }

  const handleDelete = () => {
    setDeleted(true);
    deletedFun({isDeleted : deleted}, task.id);
  }
  return (
    <Card className="bg-gray-900 border border-blue-700 text-blue-400">
      <CardHeader>
        {done ? <CardTitle className="text-lg text-decoration-line:line-through">{task.task}</CardTitle> : <CardTitle className="text-lg">{task.task}</CardTitle>}
        <CardDescription className="text-gray-400">{task.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-blue-300">Priority: {task.priority}</span>
          <span className="text-gray-400">Due: {date}</span>
        </div>
        <div className="flex justify-between text-black font-bold mt-10">
          <button className="w-20 bg-blue-600 p-1 rounded hover:bg-blue-400 hover:scale-100 hover:cursor-pointer " onClick={handleUpdate} disabled>Done</button>
          <button className="w-20 text-white border-1 border-white rounded font-light hover:bg-gray-500 hover:scale-105 hover:cursor-pointer transition" onClick={handleDelete} >Delete</button>
        </div>
      </CardContent>
      
    </Card>
  )
}

export default AddCard
