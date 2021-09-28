

const { getUrl } = require ('../../utils/upload')


module.exports = {
	
	Mutation: {
		async createPost(_,{image},context){
			console.log(image)
			const myUrl = await getUrl(image)
			return myUrl
		
		}
	}
}