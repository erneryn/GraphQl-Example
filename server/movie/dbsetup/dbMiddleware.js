module.exports = async (req,res,next) =>{

const dbName = 'entertainme'
const {MongoClient , ObjectId} = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useUnifiedTopology: true })

  await client.connect()
  const db = client.db(dbName)
  const Movies = db.collection('Movies') 
  req.movies = Movies
  req.ObjectId = ObjectId

  next()
}