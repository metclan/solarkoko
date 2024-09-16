import cloudinary from 'cloudinary'
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = pro$
export const cloudinaryApi = cloudinary.v2
cloudinaryApi.config({
        cloud_name : CLOUDINARY_CLOUD_NAME,
        api_key : CLOUDINARY_API_KEY,
        api_secret : CLOUDINARY_API_SECRET
})