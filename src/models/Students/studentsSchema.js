const mongoose = require("mongoose")
const { validator } = require ("mongoose-validator")

const projectsSchema = new mongoose.Schema({
    name: String,
    description: String,
    githubUrl: String,
    quantity: Number
    
})

const studentSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    surname: { 
        type: String,
        required: true
        
    },
    email: { 
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid!")
            }
        }
    },

    dateOfBirth:{ 
        type: Date,
        required: false
    },

    projects: [projectsSchema]
})

const studentCollection = mongoose.model("student", studentSchema)

module.exports = studentCollection