import express from 'express'
import db from '../db.js'

const routes = express.Router();

//To display all the todos
routes.get('/',(req,res)=>{
    const displayTodos = db.prepare('SELECT * FROM todo WHERE user_id = ?');
    const todos = displayTodos.all(req.userId);
    res.json(todos);


})

//To create new todos we use POST method
routes.post('/',(req,res)=>{
    const {tasksToAdd} = req.body;
    const addTasks = db.prepare(`INSERT INTO todo (user_id,task) VALUES (?,?)`);
    const insertTasks = addTasks.run(req.userId,tasksToAdd);
    res.json({id:insertTasks.lastInsertRowid, tasksToAdd, completed:0})
    

})

//To update todos to completed 
routes.put('/:id',(req,res)=>{

})
//To delete the task
routes.delete('/:id',(req,res)=>{

})





export default routes;