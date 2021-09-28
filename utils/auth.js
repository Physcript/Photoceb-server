
require('dotenv').config()
const User = require('../models/User')
const { AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const auth = async (context) => {

	try {
		if(!context.req.headers.authorization){
			throw new AuthenticationError('You must be logged in');
		}
		const token = context.req.headers.authorization.split('Bearer ')[1]
		const decode = await jwt.verify(token,process.env.JWT_SECRET, (err,userId) => {
			if(err){
				throw new AuthenticationError('You must be logged in');
			}else{
				return userId
			}
		} )
		const user = await User.findById(decode._id)
		if(!user) {
			throw new AuthenticationError('You must be logged in');
		}

		return user


	}catch(e){
		throw new AuthenticationError('You must be logged in');
	}
}


module.exports = auth