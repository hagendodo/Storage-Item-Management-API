const express = require('express')
const route = express.Router()
const StorageController = require('../controllers/storageController')
const storageController = new StorageController()

route.get('/', storageController.get)

route.post('/add', storageController.add)

route.patch('/update', storageController.update)

route.delete('/delete', storageController.delete)

route.get('/search', storageController.search)

module.exports = route