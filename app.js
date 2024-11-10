const express = require('express')
const userRouter= require('./routes/user.routes')
const dotenv =require('dotenv')
dotenv.config()
const connect=require('./config/db')
const connectToDB = require('./config/db')
connectToDB()
const app = express()

// const path = require('path');
// app.set('views', path.join(__dirname, 'views'));

app.set('view engine','ejs')//accesing view engine to render ejs file path
app.use(express.json()) // middleware to print json code into javascript object form (req.body)
app.use(express.urlencoded({extended: true})) // middle ware to convert url into json code

app.use('/user',userRouter) // all routes defined in userRoutes. acces only under  /user routes
        


app.listen(3000,()=>{ // create port on localhost we can choose our own port must have four no. 
    console.log('server sucessfully running on the  http://localhost:3000') // printing statment on terminal
})