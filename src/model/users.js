const mongoose = require('mongoose')
const PassportLocalMongoose = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true
    },
    email : {
        type : String
    },
    password : {
         type : String,
         select : false
    }
})
userSchema.plugin(PassportLocalMongoose , {usernameField : 'email'})
module.exports = mongoose.model('User',userSchema)
