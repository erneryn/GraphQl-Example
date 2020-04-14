const { gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')

const {
  tvMutation,
  tvQuery
  } = require('../resolvers/tvSeriesRes')

module.exports = makeExecutableSchema({
  typeDefs: gql`
  type tvSeries {
    _id: ID
    title: String
    poster_path: String
    overview: String
    popularity: Float
    tags: [String]
  } 
  
  type Query {
    tvseries:[tvSeries]
    findOnetvSeries(tvId : ID): tvSeries
  }

  type Mutation {
    addtvSeries(
      title: String
      popularity: Float
      poster_path: String
      overview: String
      tags: [String]
      ): tvSeries

    updatetvSeries(
      tvId:ID
      title: String
      popularity: Float
      poster_path: String
      overview: String
      tags: [String] 
    ): tvSeries
    
    deletetvSeries(tvId: ID) : tvSeries
  }
  `,
  resolvers: {
    Query: tvQuery ,
    Mutation: tvMutation
  }
})