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
        required: function () { return !this.googleId; }
    },
    phone: {
        type: Number,
        required: function () { return !this.googleId; }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple users to have 'null' googleId
    },
    addresses: [{
        addressLine: {
            type: String
        },
        city: {
            type: String,
        },
        state: {
            type: String
        },
        postalCode: {
            type: Number
        },
        primary: {
            type: Boolean,
            default: false
        }
    }],
    profilePic: {
        type: String
    },
    otp: {
        type: String,
        index: { expires: 300 },
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isFirstLoggedIn: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
    }

}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)