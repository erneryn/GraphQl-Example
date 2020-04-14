const express = require('express')
const router = express.Router()
const controller  =require('../controller/controller')

router
  .get('/tvseries',  controller.getAlltvSeries)
  .post('/tvseries',  controller.posttvSeries)
  .get('/tvseries/:id',  controller.getOnetvSeries)
  .put('/tvseries/:id',controller.puttvSeries)
  .delete('/tvseries/:id',controller.deletetvSeries)




module.exports = router