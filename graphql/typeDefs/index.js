const { gql } = require ('apollo-server-express')

module.exports = gql`

    scalar Upload

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
    }

`