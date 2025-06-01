const express = require('express')
const adminRoutes = express.Router()
const adminController = require('../controllers/adminController')
const adminAuth = require('../middlewares/adminAuth')

adminRoutes.post('/adminRegistration',adminController.adminRegistration)
adminRoutes.post('/adminLogin',adminController.adminLoggedIn)
adminRoutes.get('/me',adminAuth,adminController.getProfile)
adminRoutes.post('/logout', adminAuth, adminController.Logout)
adminRoutes.get('/getUsers',adminAuth,adminController.getUsers)
adminRoutes.get('/getUserServices/:userId',adminAuth,adminController.UserServices)
adminRoutes.get('/bookedServices',adminAuth,adminController.bookedServices)
adminRoutes.get('/contactMessages',adminAuth,adminController.contactMessages)
adminRoutes.put('/updateService/:serviceId',adminAuth,adminController.UpdateServices)




module.exports=adminRoutes;