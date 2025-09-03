import express from 'express'

const app = express();
const PORT = process.env.PORT || 8383

app.listen(PORT,()=>{

    console.log(`Server has started in port : ${PORT}`);
    

})

