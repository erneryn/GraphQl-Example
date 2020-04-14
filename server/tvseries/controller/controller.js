const createError = require('http-errors')

class Controller {
  
  static getAlltvSeries(req,res,next){
    const tvSeries  = req.tvSeries
    tvSeries.find({}).toArray()
    .then(resp=>{
      res.status(200).json(resp)
    })
    .catch(err=>{
      next(err) 
    })
  }

  static getOnetvSeries(req,res,next){
    const tvSeries = req.tvSeries
    const _id = req.params.id
    const ObjectId = req.ObjectId
    tvSeries.findOne({ _id: ObjectId(_id)})
    .then(resl=>{
      if (!resl) {
       throw createError(404,'data not found')
      }
      res.status(200).json(resl)
    })
    .catch(err=>{
      next(err)
    })
  }

  static posttvSeries(req,res,next){
    const  tvSeries =  req.tvSeries
    const { 
      title,
      overview,
      poster_path,
      popularity,
      tags
    } = req.body

    tvSeries.insertOne({
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      .then(resl=>{
        res.status(200).json(resl.ops[0])
      })
      .catch(err =>{
        next(err)
      })
  }

  static puttvSeries(req,res,next){
     const  tvSeries =  req.tvSeries
     const { 
      title,
      overview,
      poster_path,
      popularity,
      tags
    } = req.body
    const ObjectId = req.ObjectId
    const _id = req.params.id
    console.log({overview})
    tvSeries.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: {title,overview,poster_path,popularity,tags} },
      { returnOriginal: false }
      )
      .then(resl=>{
        res.status(200).json(resl.value)
      })
      .catch(err=>{
        console.log(err)
        next(err)
      })
  }

  static deletetvSeries(req,res,next){
    const  tvSeries =  req.tvSeries
    const ObjectId = req.ObjectId
    const _id = req.params.id
    tvSeries.findOneAndDelete(
      { _id: ObjectId(_id)})
    .then(result=>{
      if(result.value){
        res.status(200).json({
          message: "delete succesfully",
          payload: result.value
        })
       } else{
          throw createError(404,'Data Not Found')
        }
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = Controller

