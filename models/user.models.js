const mongoose = require('mongoose')
const { trim, isLowercase } = require('validator')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        Lowercase: true,
        unique: true,
        minlength: [3, "must contain 3 character long"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        Lowercase: true,
        unique: true,
        minlength: [10, "must contain 10 character long"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, "must contain 4 character long"]
    }
})

const user = mongoose.model('user', userSchema)
module.exports=user;