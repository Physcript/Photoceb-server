const { gql } = require ('apollo-server-express')

module.exports = gql`

    scalar Upload

    type User {
        firstName: String
        lastName: String
        email: String
        createdAt: String
        verified: String
        token: String
        refreshToken: String
    }

    type Query {
        
        _: String
    }

    type Mutation {
        
        _: String

        createUser( 
            firstName: String
            lastName: String
            email: String
            password: String
            confirmPassword: String
            image: String
            token: String
            verified: String
            refreshToken: String
            createdAt: String
        ): String

        loginUser( 
            email:String
            password:String
        ): String
    }

`