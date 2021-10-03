


const mongoose = require('mongoose')
const dislikeSchema = mongoose.Schema({

	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}

})

const Dislike = mongoose.model('Dislike',dislikeSchema)
module.exports = Dislike