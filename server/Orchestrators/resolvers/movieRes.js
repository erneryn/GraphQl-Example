const axios = require('axios')
const urlMovie= 'http://localhost:3002/movies'
const moviesApi = axios.default.create({baseURL: urlMovie})
const Redis = require('ioredis')
const redis = new Redis()


const moviesQuery ={
  movies: async () =>{
    try { 
      const cacheData = await redis.get('movies')
      if(!cacheData){
          redis.set('movies',JSON.stringify(data))
          return data
        } else {
            return JSON.parse(cacheData)
          }
     } catch (error) {
      return error
    }
  },
  findOneMovie : async (_,{ movieId },context,info) =>{
    try {
      const cacheData = await redis.get('movies')
      if(!cacheData){
        const { data } = await moviesApi.get(`/${movieId}`)
        return data
      }else{
        const parsedData = JSON.parse(cacheData)
        const result = parsedData.filter(el=> el._id == movieId)
        return result[0]
      }
  
    } catch (error) {
      
    }
  }
}

const moviesMutation = {
  addMovie: async (_,args,context,info) =>{
    try {
      const newMovie = {
        title: args.title,
        popularity: args.popularity,
        overview: args.overview,
        poster_path: args.poster_path,
        tags: args.tags
      }
      const { data } = await moviesApi.post('/',newMovie)
      redis.del('movies')
      return data
    } catch (error) {
      return error
    }
  },

  updateMovie: async(_,args) => {
    try {
      const updateMovie={
        title: args.title,
        popularity: args.popularity,
        overview: args.overview,
        poster_path: args.poster_path,
        tags: args.tags
      }
      const movieId = args.movieId
      console.log(args)
      const { data }= await moviesApi.put(`/${movieId}`,updateMovie)
      redis.del('movies')
      return data
    } catch (error) {
      return error      
    }
  },

  deleteMovie: async(_,{ movieId})=>{
    try {
        const { data } = await moviesApi.delete(`/${movieId}`)
        redis.del('movies')
        return data.payload
    } catch (error) {
        return error
    }
  }
}

module.exports = { moviesQuery, moviesMutation } 