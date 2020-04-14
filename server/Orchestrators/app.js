const { ApolloServer , gql } = require('apollo-server')

const mergedSchema = require('./schemas/index')

const server = new ApolloServer({schema: mergedSchema})

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });