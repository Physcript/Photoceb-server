

const { getUrl } = require ('../../utils/upload')
const { deleteUpload } = require('../../utils/upload')

const auth = require('../../utils/auth')

const User = require('../../models/User')
const Post = require('../../models/Post')

const mongoose = require('mongoose')


module.exports = {

	Query:{
		async getPost(_,{limit = 2},context){

			const post = await Post.aggregate([

	

				{
					$project: {
						_id: "$_id",
						firstName: "$firstName",
						email: "$email",
						image: "$image",
						createdAt: "$createdAt",
						user: "$user",
					}
				},

				{
					$lookup:{
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'userPost'
					}
				},
				{
					$unwind: '$userPost'
				},

				{
					$project: {
						_id: 1,
						firstName: 1,
						email: 1,
						image: 1,
						createdAt:1,
						postUser: '$userPost',
					}
				},

				{
					$sort: { createdAt: -1}
				},
				{
					$limit: limit
				}

			])

			return post
		},

		async getPostLength(_,{},context){

			const user = await auth(context)
			const post = await Post.find().count()
			return post

		}
	},


	Mutation: {
		async createPost(_,{image},context){
			const data = await getUrl(image)
			return data	
		},
		async deleteCreatePost(_,{public_id},context){
			console.log('deleting ',public_id)
			deleteUpload(public_id)
			return 'Deleted'
		},
		async create_post(_,{image},context){

			const user = await auth(context)

			try {
				
				const post = new Post({
					firstName: user.firstName,
					image: image,
					email: user.email,
					createdAt: new Date().toISOString(),
					user: mongoose.Types.ObjectId(user._id)
				})



				await post.save()
				
				return post;
			}
			catch(e){
				return e
			}
		}
	}
}