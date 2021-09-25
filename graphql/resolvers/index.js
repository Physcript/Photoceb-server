
const usersResolver = require('./users')
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')

module.exports = {

    Upload: GraphQLUpload,

    Query: {
        ...usersResolver.Query
    },
    Mutation: {
        ...usersResolver.Mutation
    }
}