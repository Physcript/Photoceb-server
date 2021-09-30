

const { getUrl } = require ('../../utils/upload')
const { deleteUpload } = require('../../utils/upload')

const auth = require('../../utils/auth')

const User = require('../../models/User')
const Post = require('../../models/Post')


module.exports = {
	
	Mutation: {
		async createPost(_,{image},context){
			console.log(image)
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
					image,
					email: user.email,
					createdAt: new Date().toISOString(),
					user: user._id
				})

				await post.save()

				console.log(post)

				return post;
			}
			catch(e){
				return e
			}
		}
	}
}