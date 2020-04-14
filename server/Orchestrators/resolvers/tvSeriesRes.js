const axios = require('axios')
const urlMovie= 'http://localhost:3001/tvseries'
const tvApi = axios.default.create({baseURL: urlMovie})
const Redis = require('ioredis')
const redis = new Redis()

const tvQuery = {
  tvseries : async () =>{
    try {
      const cacheData = await redis.get('tvSeries')
      if(!cacheData){
        const { data } = await tvApi.get('/')
        redis.set('tvSeries',JSON.stringify(data))
        return data
      } else{
        return JSON.parse(cacheData)
      }
    } catch (error) {
      return error
    }
  },
  findOnetvSeries: async (_,{ tvId }) =>{
    try {
      const cacheData = await redis.get('tvSeries')
      if(!cacheData){
        const { data } = await tvApi.get(`/${tvId}`)
        return data
      } else {
        const parsedData = JSON.parse(cacheData)
        const result = parsedData.filter(el=> el._id == tvId)
        return result[0]
      }
    } catch (error) {
      return error
    }
  } 
}

const tvMutation = {
  addtvSeries : async(_,args) =>{
    try {
      const newtvSeries = {
        title: args.title,
        popularity: args.popularity,
        overview: args.overview,
        poster_path: args.poster_path,
        tags: args.tags
      }
      const { data } = await tvApi.post('/',newtvSeries)
      redis.del('tvSeries')
      return data
    } catch (error) {
      return error      
    }
  },
  updatetvSeries : async(_,args) =>{
    try {
      const updtvSeries = {
        title: args.title,
        popularity: args.popularity,
        overview: args.overview,
        poster_path: args.poster_path,
        tags: args.tags
      }
      const tvID = args.tvId
      const { data } = await tvApi.put(`/${tvID}`,updtvSeries)
      redis.del('tvSeries')
      return data
    } catch (error) {
      return error      
    }
  },

  deletetvSeries : async(_,{ tvId})=> {
    try {
      const { data } = await tvApi.delete(`/${tvId}`)
      redis.del('tvSeries')
      return data.payload
    } catch (error) {
      return error
    }
  }
}

module.exports = { tvQuery, tvMutation }