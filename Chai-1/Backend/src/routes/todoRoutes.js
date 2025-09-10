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
    if (completed){
        await prisma.user.update({
            where : {
                id : req.userId,

            },
            data : {
                completedTask : {increment : 1}
    
            }
    
        })
    }
    res.json({message : "Task updated"});
    console.log("Yes it has updated")

})

router.put('/:id/undo', async (req,res)=>{
    const {id,completed} = req.body;
    await prisma.todo.update({
        where:{
            user_id : req.userId,
            id : parseInt(id)

        },
        data : {
            completed : completed
        }

    });
    await prisma.user.update({
        where : {
            id : req.userId
        },
        data : {
            
            completedTask : {decrement : 1}

        }

    })
    res.json({message:"Task undo"})
    console.log("This is undoed")


})

router.delete('/:id', async (req,res)=>{
    const {id, isDeleted} = req.body;
    await prisma.todo.update({
        where : {
            user_id : req.userId,
            id : parseInt(id)
        },
        data : {
           isDeleted
        }
    })
    res.json({message : "Task deleted"})
})



export default router;