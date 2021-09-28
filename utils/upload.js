require('dotenv').config()
const cloudinary = require('cloudinary')


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
})


const getUrl = async (files) => {


	const { filename,mimetype,encoding,createReadStream } = await files

	const streamUpload = (req) => {
		return new Promise( (resolve,reject) => {
			let stream = cloudinary.v2.uploader.upload_stream(
				(error,result) => {
					if(error){
						reject(error)
					}else{
						resolve(result)
					}
				}
			)

			req().pipe(stream)
		})
	}


	const fileUpload = async(req) => {
		return await streamUpload(req)
	}

	const data = await fileUpload(createReadStream)
	//const url = data.url.replace('upload/','upload/c_scale,h_150,w_150')

	return data.url
}


module.exports = {
	getUrl
}