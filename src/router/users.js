const express = require('express')
const router = new  express.Router()
const passport = require('passport')
const User = require('../model/users')

// GET Routes
router.get('/signup',(req,res)=>{
   res.render('signup')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})


// POST Route

router.post('/signup',(req,res)=>{
    const { name , email , password } = req.body
    const userObject = {
        name : name,
        email : email
    }

    User.register(userObject , password , (error,user)=>{
        if(error){
            req.flash('error_msg','Error:' + error)
             res.redirect('/signup')
        }
        passport.authenticate('local') (req,res,()=>{
            req.flash('success_msg','Acoount Created!')
            res.redirect('/login')
        })
    })
})

module.exports = router