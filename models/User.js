const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	image: String,
	token: String,
	verified: Boolean,
	refreshToken: String,
	createdAt: String
})
const User = mongoose.model('User',userSchema)

module.exports = User