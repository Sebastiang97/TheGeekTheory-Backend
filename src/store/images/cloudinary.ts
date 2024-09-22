import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'


// export const config = cloudinary.config(process.env.CLOUDINARY_URL)
export const config = cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImages = async (images) => {
    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.data.buffer
                const base64Image = Buffer.from(buffer).toString('base64')

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url)
            } catch (error) {
                console.log({ error })
                return error
            }
        })

        return await Promise.all(uploadPromises)
    } catch (error) {
        console.log({ error })
        return error
    }
}

export const deleteImage = async (imageUrl) => {
    const imageId = imageUrl.split('/').pop()?.split('.')[0] 
    try {
        return await cloudinary.uploader.destroy(imageId)
    }catch(error){
        return error
    }
    
}