import express from 'express'
import bcrypt from 'bcryptjs'
import db from '../db.js'
import jwt from 'jsonwebtoken'


//If the middleware intercepts it will rout to this
const routes = express.Router()

//POST req for registering the user
routes.post('/register',(req,res)=>{
    //Store from the incoming post request
    const {username, password} = req.body;
    //We need to encrypt our password
    const hashedPassword = bcrypt.hashSync(password,8);
    
    try{
        //We need to inject this info inside our SQLite db
        const user = db.prepare(`INSERT INTO user (username,password) VALUES (?,?)`);
        const result = user.run(username,hashedPassword);
        //We will insert a default task
        const defaultTask = "This is your first task";
        const insertTask = db.prepare(`INSERT INTO todo (user_id,task) VALUES (?,?)`);
        insertTask.run(result.lastInsertRowid,defaultTask);

        const token = jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET_KEY,{expiresIn:'24h'});
        res.json({token});

    }catch(err){
        console.log(err.message);
        res.sendStatus(501);
    }


})
//Login authentication
routes.post('/login',(req,res)=>{
    //Retrieve username and password
    const {username,password} = req.body;
    //Check if the username entered and db username is the same
    const user = db.prepare(`SELECT * FROM user WHERE username = ?`);
    const result = user.get(username);

    //If user is not matched we will send back a status and json telling its not matched
    if(!user){return res.status(401).json({message:"User not found"})}
    const checkPass = bcrypt.compareSync(password,result.password);
    if(!checkPass) {return res.status(401).json({message:"Password incorrect"})};

    //If both user and password match the database we will generate token
    const token = jwt.sign({id:result.id}, process.env.JWT_SECRET_KEY, {expiresIn:"24h"});
    res.json({token});

})








export default routes;