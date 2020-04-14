const createError = require('http-errors')

class Controller {
  
  static getAllMovie(req,res,next){
    console.log('movies.')
    const Movie  = req.movies
    Movie.find({}).toArray()
    .then(resp=>{
      console.log('masuk')
      res.status(200).json(resp)
    })
    .catch(err=>{
      console.log(err)
      next(err) 
    })
  }

  static getOneMovie(req,res,next){
    const Movie = req.movies
    const _id = req.params.id
    const ObjectId = req.ObjectId
    Movie.findOne({ _id: ObjectId(_id)})
    .then(resl=>{
      if (!resl) {
        throw createError(404,'data not found')
      }
      res.status(200).json(resl)
    })
    .catch(err=>{
      console.log(err)
      next(err)
    })
  }

  static postMovie(req,res,next){
    const  Movie =  req.movies
    const { 
      title,
      overview,
      poster_path,
      popularity,
      tags
    } = req.body

    console.log(title)

    Movie.insertOne({
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

  static putMovie(req,res,next){
     const  Movie =  req.movies
     const { 
      title,
      overview,
      poster_path,
      popularity,
      tags
    } = req.body
    const ObjectId = req.ObjectId
    const _id = req.params.id

    Movie.findOneAndUpdate(
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

  static deleteMovie(req,res,next){
    const  Movie =  req.movies
    const ObjectId = req.ObjectId
    const _id = req.params.id
    
    Movie.findOneAndDelete(
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

