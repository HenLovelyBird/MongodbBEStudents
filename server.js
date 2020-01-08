const express = require("express"); 
const projectsRouter = require("./src/projects/projects");
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const studentSchema = require("./src/models/Students")

const local ="mongodb://127.0.0.1:27017/dbStudents"

mongoose.connect(local,{useNewUrlParser: true})
    .then(db => console.log("MongoDB Connected"),
        err => console.log("There was an error connecting to MongoDb, err"))

const server = express() 

const port = 3003; //port number can be changed but also in .env

server.use(express.json()); 
server.use(cors());
server.use('/projects', projectsRouter)

server.listen(port, () => { //port number and a callback, server run and listen to port
    console.log(`Howdy! Your Server is running on port ${port}`); //`${can change port number}`
});