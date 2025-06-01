const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    phone:{
        type:Number,
        required:[true,"Phone Number is required"]
    },
    addresses:[{
        id:{
        type:mongoose.Schema.Types.ObjectId,
        },
        addressLine:{
            type:String
        },
        city:{
            type:String,
        },
        state:{
            type:String
        },
        postalCode:{
            type:Number
        },
        primary:{
            type:Boolean,
            default:false
        }
    }],
    otp:{
        type:String,
        index:{expires: 300},
    },
    isVerified:{
        type:Boolean,
        default:false
    } ,
    isFirstLoggedIn:{
        type:Boolean,
        default:true
    },
    lastLogin:{
        type:Date, 
        default:true    
    }

}, { timestamps: true })
module.exports = mongoose.model('User',userSchema)