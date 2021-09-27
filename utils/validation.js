
const validator = require('validator')
const bcrypt = require('bcrypt')

const { GENERATE_LOGIN_TOKEN } = require('./token')
// model
const User = require('../models/User')


const CREATE_USER_VALIDATION = async (firstName,lastName,email,password,confirmPassword,image) => {
	
	const errors = {}
	
	const user = await User.findOne({ email })

	if(user){
		errors.email = 'Email already exist'
	}else if(!validator.isEmail(email)){
		errors.email = 'Invalid email'
	}

	firstName.trim() == '' ? errors.firstName = 'Firstname required' : ''
	lastName.trim() == '' ? errors.lastName = 'Lastname required' : ''
	password.trim() == '' ? errors.password = 'Password required' : ''
	confirmPassword.trim() == '' ? errors.confirmPassword = 'Confirm password required' : ''
	password != confirmPassword ? ( 
		errors.password = 'Password not match',
		errors.confirmPassword = 'Password not match'
		) : ''

	return {
		errors,
		valid: Object.keys(errors).length < 1
	} 

}

const LOGIN_USER_VALIDATION = async (email,password) => {

	const errors = {}

	const validate =  async (user,password) => {
		const check = await bcrypt.compare(password,user.password)
		if(check){
			const token = await GENERATE_LOGIN_TOKEN(user._id)
			user.token = token
			await user.save()
			return token
		}else{
			errors.title = 'Incorrect Email/Password'
		}
	}
	
	email.trim() == '' ? errors.title = 'Incorrect Email/Password' : ''
	password.trim() == '' ? errors.title = 'Incorrect Email/Password' : ''

	const user = await User.findOne({email})
	user ? await validate(user,password) : errors.title = 'Incorrect Email/Password'

	return {
		errors,
		valid: Object.keys(errors).length < 1,
		token: user ? user.token : ''
	}
}

module.exports = {
	CREATE_USER_VALIDATION,
	LOGIN_USER_VALIDATION
}