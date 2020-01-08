const express = require("express");
const {join} = require("path");
const multer = require ("multer");
const {writeFile, readFile} = require("fs-extra");

const router = express.Router();

const uploadFolder = join(__dirname, "../../../public/img/users"); 

const upload = multer({}); 

router.post("/upload", upload.single("image"), async(req, res, next) => {
    console.log(req.file.buffer);
    await writeFile(join(uploadFolder, req.file.originalname), req.file.buffer);
    res.send("AOK!");
}); //http://localhost:3000/files/upload

router.get("/:name/download", async (req, res, next) => {
    const { name } = req.params;
    const buffer = await readFile(join(uploadFolder, name));
    res.send(buffer);
}); //http://localhost:3000/files/image.png/download

module.exports = router