import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router();

//For get req
router.get('/',async (req,res)=>{
    const getTasks = await prisma.todo.findMany({
        where : {
            user_id : req.userId,
            isDeleted : false
        }
    })
    res.json(getTasks);
})
//For creating a todo
router.post('/', async (req,res)=>{
    const {task, description, priority, dueDate, category} = req.body
    const setTasks = await prisma.todo.create({
        data: {
            user_id : req.userId,
            task : task,
            description : description,
            priority : priority.toUpperCase(),
            dueDate : new Date(dueDate),
            category : category

        }
    })
    res.json(setTasks);
})

//For updating task which are completed
router.put('/:id', async (req,res)=>{
    const {id,completed} = req.body;
    await prisma.todo.update({
        where : {
            user_id : req.userId,
            id : parseInt(id),
        },
        data: {
            completed : completed
        }


    })
    res.json({message : "Task updated"});

})



export default router;