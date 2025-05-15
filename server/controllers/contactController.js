const Contact = require('../models/contactModels')
const User = require('../models/userModel')


async function contactMessage(req,res) {
    try {

        const userId = req.user._id
        const {name,email,message} = req.body
       
        const user = await User.findOne(userId)
        if(!user){
            res.status(400).json({success:false,message:"No User found"})
        }
        const newMessage = new Contact({
            name:name,
            email:email,
            message:message,      
        })
    
        const saveMessage = await newMessage.save()
        res.status(200).json({success:true,saveMessage, username:user.username})
        
    } catch (error) {

        res.status(500).json({success:false,message:error.message})
        
    }
   


    
}


module.exports={
    contactMessage
}