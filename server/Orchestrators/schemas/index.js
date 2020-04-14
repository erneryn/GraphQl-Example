const { mergeSchemas } = require('graphql-tools')

const moviesSchema = require('./movies')
const tvSchema = require('./tvseries')

const mergeschemas = mergeSchemas({
  schemas: [moviesSchema,tvSchema]
})

module.exports= mergeschemas