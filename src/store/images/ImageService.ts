import { FileArray, UploadedFile } from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';

export abstract class ImageService {

    

    static async uploadImages(files: FileArray ): Promise<string[]>{
        let imagesArray: UploadedFile[] = Array.isArray(files?.file) ? files.file : [files?.file]
        const uploadPromises = imagesArray.map(async (image) => {
            try {
                const buffer = await image.data.buffer
                const base64Image = Buffer.from(buffer).toString('base64')
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url)
            } catch (error: any) {
                return error
            }
        })
        return await Promise.all(uploadPromises)
        

    }

    static async uploadedFile(image: UploadedFile): Promise<string>{
        try {
            const buffer = await image.data.buffer
            const base64Image = Buffer.from(buffer).toString('base64')
            return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                .then(r => r.secure_url)
        } catch (error: any) {
            return error
        }
    }
}