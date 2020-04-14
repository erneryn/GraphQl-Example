const axios = require('axios')
const urlMovie= 'http://localhost:3002/movies'
const urlTvseries= 'http://localhost:3001/tvseries'
const Redis = require('ioredis')
const redis = new Redis()

class movieController {
  
  static async postMovie(req,res,next){
    const payload = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    try {
      const { data } = await axios.post(urlMovie,payload)
      redis.del('allData')
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  
  }

  static async getOneMovie(req,res,next){
    try {
      const temp = await redis.get('allData')
      // const currenMovie = JSON.parse(temp)
      const id = req.params.id
      console.log(id)
      if(!temp){
        const movie = await axios.get(`${urlMovie}/${id}`)
        const foundMovie = movie.data
        res.status(201).json(foundMovie)
     }
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports= movieController