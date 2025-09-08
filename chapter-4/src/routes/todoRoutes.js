import express from 'express'
import prisma from '../prismaClient.js'

const routes = express.Router();

//For displaying all the todos
routes.get('/',async (req,res)=>{
    const fetchTodos = await prisma.todo.findMany({
        where : {
            user_id : req.userId,
            isDeleted : false
        }
    })
    res.json(fetchTodos);
})

//For creating a task
routes.post('/',async (req,res)=>{
    //Insert values from the input box
    const {task} = req.body;
    const addTask = await prisma.todo.create({
        data : {
            task,
            user_id : req.userId;
        }

    })
    res.json(addTask);

})
//For updating a task
routes.put('/:id',async (req,res)=>{
    const {completed} = req.body;
    const {id} = req.params;
    const updateTask = await prisma.todo.update({
        where : {
            id : parseInt(id),
            user_id : req.userId
        },
        data : {
            completed

        }
    })
    res.json({message:"Task updated"});

})

routes.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    const deleteTask = await prisma.todo.update({
        where : {
            id : parseInt(id),
            user_id : req.userId
        },
        data : {
            isDeleted : true
        }
    })
    res.json({message:"Task soft-deleted"})
})





export default routes;