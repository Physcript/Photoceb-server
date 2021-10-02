
const mongoose = require('mongoose')

const auth = require('../../utils/auth')
const Post = require('../../models/Post')
const Like = require('../../models/Like')

const { AuthenticationError } = require('apollo-server-express')


module.exports = {

	Query: {


	},
	Mutation: {

		async createLike(_,{postId},context){
			const user = await auth(context)

			try{
				const post = await Post.findById(postId)
				if(!post){
					throw new AuthenticationError('Error')
				}

				const isLiked = await Like.findOne({ postId, userId: user._id })

				if(isLiked){

					isLiked.deleteOne()

				}else {
					const like = new Like({
						postId: mongoose.Types.ObjectId(postId),
						userId: mongoose.Types.ObjectId(user._id)
					})
					await like.save()

				}

			
				return "Done"
			}
			catch(e){
				return e
			}

		}

	}
}