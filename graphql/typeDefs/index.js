const { gql } = require ('apollo-server-express')

module.exports = gql`

    scalar Upload

    type File {
        filename: String
        mimetype: String
        encoding: String
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        image: String
        createdAt: String
        verified: String
        token: String
        refreshToken: String
    }

    type Image {
        url: String
        public_id: String
    }

    type Post {
        _id: ID
        image: String
        firstName: String
        email: String
        createdAt: String
        user: String
        postUser: User
    }



    type Query {
        
        _: String

        checkAuth: User
        getPost(limit: Int): [Post]
        getPostLength: Int 
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

        createPost(
            image: Upload
        ): Image

        deleteCreatePost(
            public_id: String
        ): String

        create_post(
            image: String
        ): Post

        createLike(postId: String): String
    }

`