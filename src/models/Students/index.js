const mongoose = require("mongoose")

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
        required: true
    },
    dateOfBirth:{ 
        type: Date,
        required: true
    }
})

const studentCollection = mongoose.model("student", studentSchema)

module.exports = studentCollection