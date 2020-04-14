module.exports = async (req,res,next) =>{


  const dbName = 'entertainme'
  const {MongoClient , ObjectId} = require('mongodb')
  const url = 'mongodb://localhost:27017'
  const client = new MongoClient(url, { useUnifiedTopology: true })

  await client.connect()
  const db = client.db(dbName)
  const tvSeries = db.collection('tvSeries') 
  req.tvSeries = tvSeries
  req.ObjectId = ObjectId
  next()

}