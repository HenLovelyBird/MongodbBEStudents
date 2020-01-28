const express = require("express"); 
const studentsRouter = require("./src/students/students")
const projectsRouter = require("./src/projects/projects")
const listEndpoints = require("express-list-endpoints");
const cors = require("cors")
const mongoose = require("mongoose")

const local ="mongodb://127.0.0.1:27017/dbStudents"

mongoose.connect(local,{useNewUrlParser: true})
    .then(db => console.log("MongoDB Connected"),
        err => console.log("There was an error connecting to MongoDb, err"))

const server = express() 

const port = 3003; //port number can be changed but also in .env

server.use(express.json()); 
server.use(cors());
server.use('/students', studentsRouter)//http://localhost:3003/students, http://localhost:3003/students/students_id/projects/projects_id
server.use('/projects', projectsRouter)

console.log(listEndpoints(server))
server.listen(port, () => { //port number and a callback, server run and listen to port
    console.log(`Howdy! Your Server is running on port ${port}`); //`${can change port number}`
});