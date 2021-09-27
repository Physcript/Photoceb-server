require('dotenv').config()
const jwt = require('jsonwebtoken')

const GENERATE_LOGIN_TOKEN = async (_id) => {
	return await jwt.sign({ _id }, process.env.JWT_SECRET)
}

module.exports = {
	GENERATE_LOGIN_TOKEN
}