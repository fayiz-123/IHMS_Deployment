const express = require('express')
const userRoutes = express.Router()
const userController = require('../controllers/userController')
const userAuth = require('../middlewares/userAuth')
const upload = require('../middlewares/upload')
const verifyResetToken = require('../middlewares/verifyResetToken')



userRoutes.post('/signup' ,userController.signup)
userRoutes.post('/otp-verification' ,userController.otpVerification)
userRoutes.post('/otp-resend',userController.resendOtp)
userRoutes.post('/forgot-password',userController.forgotPassword)
userRoutes.post('/reset-password/:token',verifyResetToken,userController.resetPassword)
userRoutes.post('/login', userController.login)
userRoutes.get('/profile',userAuth,userController.profile)
userRoutes.put('/profile-photo',userAuth,upload.single('pic'),userController.profilePhoto)
userRoutes.delete('/profile-photo/delete',userAuth,userController.deletePhoto)
userRoutes.put('/updateProfile',userAuth,userController.profileUpdate)
userRoutes.post('/addAddress',userAuth,userController.addNewAddress)
userRoutes.delete('/deleteAddress/:addressId',userAuth,userController.deleteAddress)
userRoutes.put('/setPrimaryAddress',userAuth,userController.setPrimaryAddress)




module.exports = userRoutes;