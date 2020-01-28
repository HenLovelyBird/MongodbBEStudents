const express = require("express");
const mongoose = require("mongoose")
// const validator = require ("validator")
// const Student = require("../models/Students/studentsSchema.js")//studentsschema router with projectSchema embedded
const Project = require('../models/Projects/projectsSchema')



const projectRouter = express.Router();

projectRouter.get("/", async (req, res) => {
    if(req.query.body)
        return res.send (await Project.find({ students: req.query.body }))

    const projects = await Project.find({})
    res.send(projects)
})

module.exports = projectRouter;