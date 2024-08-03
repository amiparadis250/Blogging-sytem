import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});

export const uploadImage = async (filePath, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { folder }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });
  });
};
export const deleteImage = async (imageUrl) => {
    try {
        const publicId = imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        console.log(`Image ${publicId} deleted from Cloudinary`);
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error; 
    }
};