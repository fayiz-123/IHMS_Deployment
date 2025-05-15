const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true,
        trim:true

     },
     email:{
        type:String,
        required:true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide valid email address"]    
     },
     message:{
        type:String,
        required:true,

     }

},{timestamps:true})


module.exports=mongoose.model('Contact',contactSchema)