const express = require("express");
const mongoose = require("mongoose")
// const validator = require ("validator")
const Student = require("../models/Students/studentsSchema.js")//studentsschema router with projectSchema embedded
// const Project = require('.src/projects/projectsSchema')
const Project = require("../models/Projects/projectsSchema")
const { ObjectId } = require('mongodb')


const studentRouter = express.Router();


//---------------------------------------------------------------------------------
//                          CRUD related to students 
//---------------------------------------------------------------------------------

const readStudents = async () => {
    return await Student.find()
}

studentRouter.get("/", async (req, res) => {
    if(req.query.body)
        return res.send (await Student.find({ students: req.query.body }))

    const students = await Student.find({})
    res.send(students)
})

// studentRouter.get("/", async (req, res)=>{
//     if(req.query.name)
//         return res.send(await Student.find({ name: req.query.name}))
//     const students = await Student.find({name: "eleanor"})
//     res.send(students)
// })


studentRouter.get("/:id", async (req, res)=>{
    const student = await Student.findById({_id: req.params.id})
    if (student)
        res.send(student)
    else    
        res.status(404).send(":(" + "Student Not Found")   
});


studentRouter.post("/", async (req, res)=>{
    try{
        const newStudent = await Student.create(req.body)
        newStudent.save()
        res.status(201).send(newStudent + "Your Post was Created!")
    }
    catch(err){
        res.status(500).send(err)
    }
})


mongoose.set('useFindAndModify', false);

studentRouter.put("/:id", async (req, res)=>{
    delete req.body._id
    const student = await Student.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {...req.body}
    })
    if (student)
        res.send(student + "Your Entry was Updated!")
    else
        res.status(404).send(":/" + "Check User Id and try again")
})


mongoose.set('useFindAndModify', false);

studentRouter.delete("/:id", async(req, res)=>{
    const result = await Student.findOneAndDelete( {_id: req.params.id })
    
    if (result)
        res.send("Entry was Deleted")
    else
        res.status(404).send(req.params_id + "Please check your id number and try again")
})

//---------------------------------------------------------------------------------
//                   CRUD related to students and their projects
//---------------------------------------------------------------------------------
//helper: https://github.com/bazuzu666/first-server-express/blob/master/src/services/students/index.js

studentRouter.get("/:id/projects", async (req, res) => {
    try {
        const student = await Student.findbyId(req.params.id, { projects: 10 } );
        res.send(student.projects);
    } catch (error) {
        res.send(error)
    }
}); 

studentRouter.get("/:id/projects/:projid", async (req, res) => {
    const student = await Student.findOne(
        {
            _id: new ObjectId(req.params.id), 
            "projects._id": new ObjectId(req.params.projid) 
        },

        { "projects.$" : 2 } 
    );
   res.send(student);
});

studentRouter.post("/:id/projects", async (req, res) => {
    try {
      const newProject = req.body;
  
      const Project = await Student.findByIdAndUpdate(req.params.id, {
        $push: { projects: newProject }
      });
      res.send(Project);
    } catch (error) {
      res.send(error);
    }
  });


studentRouter.patch("/:id/projects/:projid", async (req, res) => {
    try {
        await Student.updateOne(
            {_id: new ObjectId(req.params.id), 
            "projects._id": new ObjectId(req.params.projid)}, 
            {"projects.$": req.body })
        response.send("ok")
    } catch (err) {
      response.send(err);
    }
})

studentRouter.delete("/:id/projects/:projid", async (req, res) => {
    try{
    await Student.findByIdAndUpdate(req.params.id, { 
        $pull: {projects: { _id: new ObjectId(req.params.projid)}}
})  
    res.send("ok")
}   catch (err) {
    res.send(err)
}
});


module.exports = studentRouter;