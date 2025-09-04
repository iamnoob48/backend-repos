import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import auth from "./middleware/auth.js"


const app = express();
const PORT = process.env.PORT || 8383


//This line if code is used to get the path of the file name
//import.meta.url is sending the url of the file server.js when we use type module we cannot specify the direct path so we use fileURLToPath method
const __filename = fileURLToPath(import.meta.url);

//This is used to get the directory name which the file exists in
const __dirname = dirname(__filename);




//This acts as a middleware which is used to accept json  data whenever a network request is made.
app.use(express.json());
//This is used to fine the static file which are in public folder hence we used static method
app.use(express.static(path.join(__dirname,"../public")))


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.use("/auth",authRoutes);

app.use("/todos",auth,todoRoutes);

app.listen(PORT,()=>{

    console.log(`Server has started in port : ${PORT}`);


})

