const { gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')


const {
  moviesMutation,
  moviesQuery
} = require('../resolvers/movieRes')

module.exports = makeExecutableSchema({
  typeDefs: gql`
type Movies {
  _id: ID
  title: String
  poster_path: String
  overview: String
  popularity: Float
  tags: [String]
} 
type Query {
  movies: [Movies]
  findOneMovie(movieId: ID): Movies
}


type Mutation {
  addMovie(
    title: String
    popularity: Float
    poster_path: String
    overview: String
    tags: [String]
    ): Movies

    updateMovie(
      movieId: ID
      title: String
      popularity: Float
      poster_path: String
      overview: String
      tags: [String]
      ): Movies
    
    deleteMovie(movieId: ID) : Movies
}
`,
resolvers: {
  Query: moviesQuery,
  Mutation: moviesMutation
}
    
})
