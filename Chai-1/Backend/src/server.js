import express from 'express'


import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import auth from './middleware/auth.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())



//For auth routes
app.use('/auth',authRoutes);
//For todoRoutes
app.use('/todo',auth,todoRoutes)
//For analytics route
app.use('/analyse',auth,analyticsRoutes)





app.listen(PORT, ()=>{
    console.log("Server started on port", PORT);
})
