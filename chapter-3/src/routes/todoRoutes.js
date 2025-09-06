import express from 'express'
import db from '../db.js'

const routes = express.Router();

//For displaying all the todos
routes.get('/',(req,res)=>{
    const fetchTodos = db.prepare(`SELECT * FROM todo WHERE user_id = ? AND isDeleted = 0`);
    const result = fetchTodos.all(req.userId);
    res.json(result);
})

//For creating a task
routes.post('/',(req,res)=>{
    //Insert values from the input box
    const {task} = req.body;
    const addTask = db.prepare(`INSERT INTO todo (user_id,task) VALUES (?,?)`)
    const result = addTask.run(req.userId,task);
    res.json({id:result.lastInsertRowid,task,completed:0});

})
//For updating a task
routes.put('/:id',(req,res)=>{
    const {completed} = req.body;
    const {id} = req.params;
    const updateTask = db.prepare(`UPDATE todo SET completed = ? WHERE id = ?`);
    updateTask.run(completed,id);
    res.json({message:"Task updated"});

})

routes.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const deleteTask = db.prepare(`UPDATE todo SET isDeleted = 1 WHERE id = ?`);
     deleteTask.run(id);
    res.json({message:"Task soft-deleted"})
})





export default routes;