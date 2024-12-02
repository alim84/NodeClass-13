const { default: mongoose, Schema, model } = require("mongoose");

const userSchema= new Schema({
    name:String,
    email:String,
    password:String
})

module.exports=mongoose.model("user", userSchema)