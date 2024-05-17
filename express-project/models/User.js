const mongoose = require('mongoose')
const user_schema = new mongoose.Schema({

    username : {required : true  , type : String , default : "default username"}
    , 
    password : {
        required : true  , type : String 
    }
})

module.exports = mongoose.model("User", user_schema)