const express = require('express')
const adminRoutes = express.Router()
const adminController = require('../controllers/adminController')
const adminAuth = require('../middlewares/adminAuth')

adminRoutes.post('/adminRegistration',adminController.adminRegistration)
adminRoutes.post('/adminLoggedIn',adminController.adminLoggedIn)
adminRoutes.get('/getUsers',adminAuth,adminController.getUsers)
adminRoutes.get('/bookedServices',adminAuth,adminController.bookedServices)
adminRoutes.get('/contactMessages',adminAuth,adminController.contactMessages)
adminRoutes.put('/updateService/:serviceId',adminAuth,adminController.UpdateServices)




module.exports=adminRoutes;