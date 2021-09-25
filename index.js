require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const { ApolloServer } = require('apollo-server-express')
const { GraphQLUpload,graphqlUploadExpress } = require('graphql-upload')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const Server = async (typeDefs,resolvers) => {

    const app = express()
    const PORT = process.env.PORT || 4000
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => ({req})
    })

    app.use(graphqlUploadExpress())

    await server.start()

    server.applyMiddleware({
        app
    })
    
    mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology:true
    }).then( () => {
        console.log('DATABASE CONNECTED')
        app.listen(PORT, () => {
            console.log(`Server Port: ${PORT}`)
        })
    })

}

Server(typeDefs,resolvers)