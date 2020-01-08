const express = require("express");
const {readFile, writeFile} = require("fs-extra");
const path = require("path");
const {check, validationResult, sanitize} = require("express-validator");
// Bodies, params and queries must be validated with express-validator middleware
const router = express.Router();
const filePath = path.join(__dirname, "projects.json");
const Student = require("../models/Students")

// const readFile = filePath => {
//     const buffer = fs.readFileSync(filePath);
//     const fileContent = buffer.toString();
//     return (JSON.parse(fileContent));
// };
//req for projects i all

const studentRouter = express.Router();

const readStudents = async () => {
    return await Student.find()
}

// router.get('/', async (req, res) => {
//   const buffer = await readFile(filePath);
//   const fileContent = buffer.toString();
//   const projectsArray = JSON.parse(fileContent);
//     // console.log(projectsArray);
//   res.send(projectsArray);
// });
//READ http://localhost:3000/projects/ to GET all the projects

studentRouter.get("/:id", async (req, res)=>{
    const student = await Student.findOne({_id: req.params.id})
    if (student)
        res.send(studnet)
    else    
        res.status(404).send(":(" + "Student Not Found")   
})

// req for particular project id number
// router.get('/:id', [sanitize("id").toInt()], async (req, res) => {
//     const buffer = await readFile(filePath);
//     const fileContent = buffer.toString();
//     const projectsArray = JSON.parse(fileContent);
//     const findproject = projectsArray.find(
//         project => project.id === req.params.id
//     );
//     // console.log(req.params.id);
//     if (findproject){
//         res.send(findproject);
//     } else {
//         res.status(401).send(`project ${req.params.id} not found!`);
//     }
// });// READ http://localhost:3000/projects/1 to GET a single user by id

// router.get("/", async (req, res, next) => {
//     try {
//       const buffer = await readFile(filePath);
//       const fileContent = buffer.toString();
//       const studentsArray = JSON.parse(fileContent);
//       if (req.query && req.query.name) {
//         const filteredStudents = studentsArray.filter(
//           student =>
//             student.hasOwnProperty("name") &&
//             student.name.toLowerCase() === req.query.name.toLowerCase()
//         );
//         res.send(filteredstudents);
//       } else {
//         res.send(studentsArray);
//       }
//     } catch (error) {
//       // if (error.code === "ENOENT") {
//       //   next("SERVER ERROR - FILE NOT FOUND");
//       // }
//       next(error);
//     }
//   }); // GET http:localhost:3000/users?name=john to LIST the users filtered by name

router.post('/', async (req,res) => {  //in this POST I want to receive the entire obj array for a particular id and append it
    const buffer = await readFile(filePath);
    const fileContent = buffer.toString();
    const projectsArray = JSON.parse(fileContent);
    const newproject = {
        ...req.body, 
        id: projectsArray.length + 1, 
        numberofprojects: 5,
        creation: new Date(),
        
    };
    projectsArray.push(newproject);
    fs.writeFileSync(filePath, JSON.stringify(projectsArray));
    res.status(201).send(`${newproject.id}`);
});// CREATE http://localhost:3000/projects/ to POST a single user


router.put('/:id', async (req, res)=> {
    const modifyproject = req.body;
    const buffer = await readFile(filePath);
    const fileContent = buffer.toString();
    let projectsArray = JSON.parse(fileContent);
    projectsArray[Number.parseInt(req.params.id) -1] = modifyproject; //-1?
    await writeFile(filePath, JSON.stringify(projectsArray));
    res.send(modifyproject);
});// PUT http://localhost:3000/projects/ID to UPDATE a single user

router.delete('/:id', async (req, res) => {
    const buffer = await readFile(filePath);
    const fileContent = buffer.toString();
    const projectsArray = JSON.parse(fileContent);
    const keepProjects = projectsArray.filter(project => project.id !== req.params.id);
    
    await writeFile(filePath, JSON.stringify(keepProjects));
    res.status(204);
}); // DELETE http://localhost:3000/projects/ to DELETE a single user


module.exports = studentRouter;