const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3001
const indexRouter = require('./route/index')
const dbMiddleware = require('./dbsetup/dbMiddleware')
const errorHandler = require('./middleware/hadlingerror')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app
  .use(dbMiddleware)
  .use('/',indexRouter)
  .use(errorHandler)

app.listen(PORT,()=> console.log('running on port ',PORT))


