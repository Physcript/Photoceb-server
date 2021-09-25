
const validator = require('validator')

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

module.exports = {
	CREATE_USER_VALIDATION
}