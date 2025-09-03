const express = require("express");

const app = express();
const PORT = 3000;

const data = [
    {name:"james",jobRole:"Full stack developer",company:"Joveo"},

    
]
//MiddleWare
app.use(express.json())

//Website endPoints - just for the purpose of our visual request and response

app.get("/", (req,res)=>{
    console.log(req.method);
    res.send("<h1>This is a home page with endpoint '/'</h1>");

})

app.get("/login", (req,res)=>{
    console.log("This is the login page");
    res.send(`<body>

    <h1>DATA: </h1>
    <p>${JSON.stringify(data)}</p>
    
    
    </body>`)

})

//API endPoints - non-visual endpoints
app.get("/api/data", (req,res)=>{
    console.log("this is an api endpoint");
    res.send(data);

})

app.post("/api/data", (req,res)=>{
    const newEntry = req.body;
    res.sendStatus(201);
    data.push(newEntry);


})
app.delete("/api/data",(req,res)=>{
    data.pop();
    res.sendStatus(203)
})

app.listen(PORT, ()=>{
    console.log(`Server is started on ${PORT}`)
})