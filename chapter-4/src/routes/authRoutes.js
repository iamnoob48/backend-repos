import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClent.js'


//If the middleware intercepts it will rout to this
const routes = express.Router()

//POST req for registering the user
routes.post('/register',async (req,res)=>{
    //Store from the incoming post request
    const {username, password} = req.body;
    //We need to encrypt our password
    const hashedPassword = bcrypt.hashSync(password,8);
    
    try{
        //We are inserting our username and password using prisma orm
        const user = await prisma.user.create({
            data : {
                username,
                password : hashedPassword
            }
        })
        //We will insert a default task
        const defaultTask = "This is your first task";
        await prisma.todo.create({
            data : {
                task : defaultTask,
                user_id : user.id
            }
        })

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'});
        res.json({token});

    }catch(err){
        console.log(err.message);
        res.sendStatus(501);
    }


})
//Login authentication
routes.post('/login',async (req,res)=>{
    //Retrieve username and password
    const {username,password} = req.body;
    //Check if the username entered and db username is the same
    const user = await prisma.user.findUnique({
        where : {
            username : username,
            
        }
    })

    //If user is not matched we will send back a status and json telling its not matched
    if(!user){return res.status(401).json({message:"User not found"})}
    const checkPass = bcrypt.compareSync(password,user.password);
    if(!checkPass) {return res.status(401).json({message:"Password incorrect"})};

    //If both user and password match the database we will generate token
    const token = jwt.sign({id:result.id}, process.env.JWT_SECRET_KEY, {expiresIn:"24h"});
    res.json({token});

})








export default routes;