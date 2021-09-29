

const { getUrl } = require ('../../utils/upload')


module.exports = {
	
	Mutation: {
		async createPost(_,{image},context){
			console.log(image)
			const data = await getUrl(image)
			return data	
		}
	}
}