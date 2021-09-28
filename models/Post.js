
const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
	firstName: String,
	image:String,
	email:String,
	createdAt: String
})
const Post = mongoose.model('Post',postSchema)
module.exports = Post