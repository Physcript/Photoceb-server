
const mongoose = require('mongoose')

const auth = require('../../utils/auth')

const Post = require('../../models/Post')
const Like = require('../../models/Like')
const Dislike = require('../../models/Dislike')

const { AuthenticationError } = require('apollo-server-express')


module.exports = {

	Query: {
		async getCountLikeDislike(_,{postId},context){

			const countLike = await Like.find({ postId }).count()
			const countDislike = await Dislike.find({postId}).count()

			return {

				countLike,
				countDislike

			}
		},

		async getLikeInfo(_,{postId},context){
			const user = await auth(context)
			try {

				const chk_likePost = await Like.findOne({ postId, userId: user._id })
				const chk_dislikePost = await Dislike.findOne({ postId, userId: user._id })

				const data = {
					like: false,
					dislike: false
				}

				if(chk_likePost) data.like = true

				if(chk_dislikePost) data.dislike = true

				return {
					like: data.like,
					dislike: data.dislike
				}

			}catch(e){
				return e
			}
		}
	},

	Mutation: {




		async createDislike(_,{postId},context){
			const user = await auth(context)
			try {
				const post = await Post.findById(postId)

				// check if post exists
				if(!post){
					throw new AuthenticationError('Error')
				}




				// chek if already dislike the post
				const chk_dislike = await Dislike.findOne({ postId: post._id, userId: user._id  })
				
				if(!chk_dislike){
					// create
					const dislike = new Dislike({
						postId: post._id,
						userId: user._id
					})


					const chk_like = await Like.findOne({ postId: post._id , userId: user._id })

					if(chk_like){
						
						await chk_like.remove()

					}


					await dislike.save()

				}else {

					await chk_dislike.remove()

				}


				return "test"
			}
			catch(e){
				return e
			}
		},













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

					const chk_dislike = await Dislike.findOne({ postId: post._id, userId: user._id })
					
					if(chk_dislike) {
						await chk_dislike.remove()
					}

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