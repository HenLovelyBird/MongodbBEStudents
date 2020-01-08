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
    datOfBirth:{ 
        type: Number,
        required: true
    }
})

const studentCollection = mongoose.model("Students", studentSchema)

module.exports = studentCollection