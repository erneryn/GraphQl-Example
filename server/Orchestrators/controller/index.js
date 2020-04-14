const axios = require('axios')
const urlMovie= 'http://localhost:3002/movies'
const urlTvseries= 'http://localhost:3001/tvseries'
const Redis = require('ioredis')
const redis = new Redis()

class Controller {  

  static async getAllData(req,res,next){
    try {
      const cacheData = await redis.get('allData')
      if(cacheData){
        res.status(200).json(JSON.parse(cacheData))
      } else {
        const { data: movie } = await axios.get(urlMovie)
        const { data: tvseries } = await axios.get(urlTvseries)

        const setCache = {
            movie,
            tvseries
        }
  
        await redis.set('allData',JSON.stringify(setCache))
        res.status(200).json(setCache)

      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

}

module.exports=Controller