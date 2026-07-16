import { v2 as cloudinary } from 'cloudinary';
import AppError from './AppError.js';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'tirupati_automobiles',
      use_filename: true,
    });
    return result.secure_url;
  } catch (error) {
    throw new AppError('Failed to upload image to Cloudinary', 500);
  }
};

export const deleteImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    
    // Extract public id from secure_url
    // e.g. https://res.cloudinary.com/demo/image/upload/v1234/tirupati_automobiles/sample.jpg
    const parts = imageUrl.split('/');
    const folderAndFile = parts.slice(parts.length - 2).join('/'); // tirupati_automobiles/sample.jpg
    const publicId = folderAndFile.split('.')[0]; // tirupati_automobiles/sample
    
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    // We do not throw an error here to prevent blocking standard operations if an image is just missing.
  }
};

export const uploadMedia = async (filePath) => {
  try {
    const isPdf = filePath.toLowerCase().endsWith('.pdf');
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'tirupati_automobiles/media',
      use_filename: true,
      resource_type: isPdf ? 'raw' : 'auto',
    });
    return result.secure_url;
  } catch (error) {
    throw new AppError('Failed to upload media to Cloudinary', 500);
  }
};

export const deleteMedia = async (mediaUrl) => {
  try {
    if (!mediaUrl) return;
    
    const parts = mediaUrl.split('/');
    const folderAndFile = parts.slice(parts.length - 3).join('/'); // e.g. tirupati_automobiles/media/sample.pdf
    
    let publicId;
    let resourceType;

    if (mediaUrl.includes('/raw/upload/')) {
      // Raw files include the extension in their public_id
      publicId = folderAndFile;
      resourceType = 'raw';
    } else {
      // Images exclude the extension
      publicId = folderAndFile.split('.')[0];
      resourceType = 'image';
    }
    
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error('Cloudinary media deletion error:', error);
  }
};
