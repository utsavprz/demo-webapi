require('dotenv').config()
const express = require('express')
const User = require('../models/user_model')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', (req, res, next) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if(user != null){
                let err = new Error(`Username ${req.body.username} already registered.`)
                return next(err)
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) return next(err)
                user = new User()
                user.username = req.body.username
                user.password = hash
                user.save().then(user => {
                    res.status(201).json({
                        status : 'User registration successfull',
                        userId : user._id,
                        username: user.username
                    })
                }).catch(next)
            })
        }).catch(next)
})

router.post('/login', (req, res, next) => {
    User.findOne({username:req.body.username})
    .then(user => {
        if (user == null){
            let err = new Error('User is not registered')
            return next(err)
        }
        bcrypt.compare(req.body.password, user.password, (err, success)=>{
            if (err) return next(err)

            if (!success){
                let err = new Error('Password does not match.')
                return next(err)
            }

            let payload ={
                userId : user._id,
                username : user.username            
            }

            jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1d'}, (err,token)=>{
                if(err) return next(err)

                res.json({
                    status: 'Login Successful',
                    token: token
                })
            })


        })
    })
    .catch(next)
})


module.exports = router