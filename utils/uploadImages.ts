import { cloudinaryApi } from "@/lib/cloudinary";
type UploadOneImageResponse = {
    success : boolean; 
    message : string;
    url? : string;
}
type ImageUrlObject = {
    image: string;
}

type CloudinaryResult = {
    secure_url: string;
}

export async function uploadOneImage (image : File):Promise<UploadOneImageResponse> {
    // Assuming `image` is the uploaded file
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    const minFileSize = 1; // 0 MB is technically empty, so min should be 1 byte
    try{
        const fileSize = image.size;
        if (fileSize < minFileSize) {
            return { message: 'File is empty', success: false };
        }
        if (fileSize > maxFileSize) {
            return { message: 'File exceeds the maximum size of 5MB', success: false };
        }
        // Upload resume to cloudinar
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        interface CloudinaryResult {
            secure_url: string;
        }
        const cloudinaryResponse = await new Promise<CloudinaryResult>((resolve, reject) => {
            cloudinaryApi.uploader.upload_stream(
            { resource_type: 'auto' },
            (error : any, result : any) => {
                if (error) reject(error);
                else resolve(result as CloudinaryResult);
            }
            ).end(buffer);
        });
        const imageUrl = cloudinaryResponse.secure_url;
        return { success : true, url : imageUrl, message : "Successful"}
    }
    catch(err){
        console.log(err)
        return {success : false, message : "Image couldn't be uploaded"}
    }
}


export async function uploadMultipleImages(images: File[]): Promise<ImageUrlObject[]> {
    try {
        const uploadPromises = images.map(uploadToCloudinary);
        const imageUrls = await Promise.all(uploadPromises);

        const result = imageUrls.map(url => ({ image: url }));

        console.log(result);
        return result;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
}

async function uploadToCloudinary(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
        cloudinaryApi.uploader.upload_stream(
            { resource_type: 'auto' },
            (error: any, result: any) => {
                if (error) reject(error);
                else resolve((result as CloudinaryResult).secure_url);
            }
        ).end(buffer);
    });
}