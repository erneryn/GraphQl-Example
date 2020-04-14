const express = require('express')
const router = express.Router()
const controller  =require('../controller/controller')

router
  .get('/movies',  controller.getAllMovie)
  .post('/movies',  controller.postMovie)
  .get('/movies/:id',  controller.getOneMovie)
  .put('/movies/:id',controller.putMovie)
  .delete('/movies/:id',controller.deleteMovie)




module.exports = router