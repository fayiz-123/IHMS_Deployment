const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide valid email address"]
    },
    phone:{
        type:Number,
        required:[true,"Phone is required"],       
    },
    address:{
        type:String,
        required:[true,"Address is required"]
    },
    service:{
        type:String,
        enum:["electricity","plumbing", "wasteManagement"],
        required:[true,"Service is required"]
    },
    status:{
        type:String,
        enum:["booked","confirmed","completed"],
        required:[true,"Status is required"]
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
},{timestamps:true})

module.exports= mongoose.model('Service',serviceSchema)