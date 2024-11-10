const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModels = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register page code
router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register',

    body('email').trim().isEmail().isLength({ min: 10 }),
    body('password').trim().isLength({ min: 4 }),
    body('username').trim().isLength({ min: 5 })
    ,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid data'
            });
        }

        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const newUser = await userModels.create({
            email,
            username,
            password: hashedPassword
        });
        res.json(newUser);
        console.log(req.body);
    }
);

// Login page code
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',

    body('username').trim().isEmail().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 4 }),

    async (req, res) => {
        const errors = validationResult(req);
       
        if (errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            });
        }
      

        const { username, password } = req.body;
        const user = await userModels.findOne({ username: username });
        if (!user) {
            return res.status(400).json({
                message: 'User not found or username and password are incorrect'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Username or password is incorrect'
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET
        );
        res.cookie('token',token)
        res.send('logged in')
       
    }
);


module.exports = router;
