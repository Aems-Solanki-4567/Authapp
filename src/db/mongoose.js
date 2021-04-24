const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:/Authapp',{
    useCreateIndex : true,
    useUnifiedTopology : true,
    useNewUrlParser : true,
})