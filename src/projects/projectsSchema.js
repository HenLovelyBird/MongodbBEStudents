const mongoose = require("mongoose")

const projectsSchema = new mongoose.Schema({
    name: String,
    description: String,
    githubUrl: String
    
})

const projectsCollection = mongoose.model("project", projectsSchema)

module.exports = projectsCollection