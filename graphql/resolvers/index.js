
const usersResolver = require('./users')
const postsResolver = require('./posts')
const likesResolver = require('./likes')

const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')

module.exports = {

    Upload: GraphQLUpload,

    Query: {
        ...usersResolver.Query,
        ...postsResolver.Query,
        ...likesResolver.Query,
    },
    Mutation: {
        ...usersResolver.Mutation,
        ...postsResolver.Mutation,
        ...likesResolver.Mutation,
    }
}