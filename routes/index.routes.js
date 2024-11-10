const express = require('express')
const router = express.Router()
const upload=require("../config/multer.config")
const { route } = require('./user.routes')


router.get('/home',(req,res)=>{
    res.render('home')
})


router.post('/upload',upload.single('file'),(req,res)=>{ //file came from the input tag method called name="file"
    res.send(req.file)
})








module.exports=router