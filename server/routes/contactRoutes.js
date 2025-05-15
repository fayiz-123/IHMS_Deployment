const express = require('express')
const contactRoutes = express.Router()
const contactController = require('../controllers/contactController')
const userAuth = require('../middlewares/userAuth')

contactRoutes.post('/contact',userAuth,contactController.contactMessage)

module.exports=contactRoutes;