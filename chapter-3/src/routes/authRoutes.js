import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from '../db.js'

const routes = express.Router();

routes.post('/register',(req,res)=>{
    //Frontend will send a fetch request the content is inside the body so we are accessing that element
    const {username,password} = req.body;
    //When creating large scale apps we need to encrypt the passwords we use bcrypt lib to do that bu using hashSync method inside it
    const hashedPass = bcrypt.hashSync(password,8);
    //We need to inject the username pass coming from the frontend fetch request
    try{
        const insertData = db.prepare(`INSERT INTO user (username,password) VALUES (?,?)`);
        const result = insertData.run(username,hashedPass);

        //Create a default todo when the user registers
        const defaultText = "Hello this is your first todo";
        const defaultTodo = db.prepare(`INSERT INTO todo (user_id,task) VALUES (?,?)`);
        defaultTodo.run(result.lastInsertRowid,defaultText);

        //We need to create a token
        const token = jwt.sign({id:result.lastInsertRowid}, process.env.JWT_SECRET_KEY, {expiresIn:'24h'});
        res.json({token})

    }catch(err){
        console.log(err.message);
        res.sendStatus(501)
    }
    

})
routes.post('/login',(req,res)=>{
    //After user is registered and the data is entered in our database
    const {username,password} = req.body;
    try{
        
        //Fetch that data inside our database
        const getUser = db.prepare(`SELECT * FROM user WHERE username = ?`);
        const checkUser = getUser.get(username);
        console.log(checkUser,password);

        //We are checking if the user is matched or not
        if(!checkUser) {
            return res.status(404).send({message:"User not found"});
        }
        //We are checking if password is matched or not
        const checkPassword = bcrypt.compareSync(password,checkUser.password);
        if(!checkPassword){
            return res.status(404).send({message:"Password is incorrect check again"});
        }
        const token = jwt.sign({id:checkUser.id}, process.env.JWT_SECRET_KEY, {expiresIn : '24h'})
        res.json({token});


    } catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
    



})


export default routes;