
const usersResolver = require('./users')
const postsResolver = require('./posts')

const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')

module.exports = {

    Upload: GraphQLUpload,

    Query: {
        ...usersResolver.Query,
        ...postsResolver.Query
    },
    Mutation: {
        ...usersResolver.Mutation,
        ...postsResolver.Mutation
    }
}