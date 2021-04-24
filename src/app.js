const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')
const User = require('./model/users')
const userRouter = require('./router/users')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const Localstrategy =  require('passport-local').Strategy

const publicpathDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')

// Express Session
app.use(session({
    secret : 'Aemssolanki@',
    resave : true,
    saveUninitialized : true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new Localstrategy(User.authenticate())) 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Flash Middeleware
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash(('success_msg'))
    res.locals.error_msg =  req.flash(('error_msg'))
    next()
})

// Views 
app.set('view engine', 'ejs');
app.set('views',viewPath)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(userRouter)

app.use(express.static(publicpathDirectory))

app.listen(port,()=>{
    console.log(`Application running on port ${port}`)
})