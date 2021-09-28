
require('dotenv').config()
const bcrypt = require('bcrypt')
const { GENERATE_LOGIN_TOKEN } = require('../../utils/token')

// auth 
const auth = require('../../utils/auth')

// apollo
const { CREATE_USER_VALIDATION,LOGIN_USER_VALIDATION } = require('../../utils/validation')

// error
const { UserInputError } = require('apollo-server-express')
const { AuthenticationError } = require('apollo-server-express')


// model 
const User = require('../../models/User')

module.exports = {

    Query: {

        async _() {
            return "Dummy query"
        },

        async checkAuth(_,{},context){
            const user = await auth(context)

            try {
                return user
            }catch(e){

                throw new AuthenticationError()
            }
        }

    },
    Mutation: {

        async _() {
            return "Dummy mutation"
        },

        async loginUser( _, { email,password } ) {
            const { errors,valid,token } = await LOGIN_USER_VALIDATION(email,password)
            try {
                if(!valid) throw new UserInputError('Errors', { errors })

                return token
            }catch(e){
                return e
            }
        },

        async createUser( _,{ firstName,lastName,email,password,confirmPassword,image } ) {
            const newError = (err) => {
                return new UserInputError('Errors', { err })
            }

            try {
                const { errors,valid } = await CREATE_USER_VALIDATION(firstName,lastName,email,password,confirmPassword,image)
                if(!valid) throw new UserInputError('Error', { errors } )
            

                if(!image){
                    const image = 'https://res.cloudinary.com/dnnq8kne2/image/upload/v1632408683/ucgxnbq2q0re1suhd6kp.jpg'
                }
                
                const encrypt = await bcrypt.hash(password,8)

                const user = new User({
                    firstName,
                    lastName,
                    email,
                    password: encrypt,
                    confirmPassword,
                    image,
                    createdAt: new Date().toISOString(),
                    verified: false
                })

                await user.save()
                return "User created"
            }
            catch(e) {
                return e
            }
        }
    }
 
}