import { dir } from 'console';
import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from './routes/todoRoutes.js'
import auth from './middleware/auth.js'

const app = express();
const PORT = process.env.PORT || 8383;

//Retrive the file name
const __filename = fileURLToPath(import.meta.url);
//We need to get the directory name of this file
const __dirname = dirname(__filename);

//Set up my middleware to listen and read json files
app.use(express.json());
//We have to get our static directory using static method of express
app.use(express.static(path.join(__dirname,'../public')));
//We need to render our html file to our client which is browser
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));

})

//Set u authRoutes
app.use('/auth',authRoutes);
app.use('/todos',auth,todoRoutes)




//Listen to the server with PORT 
app.listen(PORT,()=>{
    console.log(`Server has started at port : ${PORT}`)
})