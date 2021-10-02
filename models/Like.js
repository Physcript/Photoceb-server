

const mongoose = require('mongoose')
const likeSchema = mongoose.Schema({

	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post' 
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}

})
const Like = mongoose.model('Like',likeSchema)
module.exports = Like