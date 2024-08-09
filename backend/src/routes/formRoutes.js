const express = require('express')
const formRoutes = express.Router()
const formController = require('../controllers/formController')


formRoutes.post('/addForm',formController.addForm)
formRoutes.get('/fetchAllForms',formController.fetchAllForms)
formRoutes.post('/fetchAform',formController.fetchAForm)
formRoutes.post('/editform',formController.editForm)
formRoutes.delete('/deleteForm/:id',formController.deleteForm)



module.exports = formRoutes