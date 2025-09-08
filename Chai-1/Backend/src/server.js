import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js"
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())

//For auth routes
app.use('/auth',authRoutes)





app.listen(PORT, ()=>{
    console.log("Server started on port", PORT);
})
