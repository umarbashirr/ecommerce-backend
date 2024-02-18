import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const uploadToCloudinary = async (filePaths: string[]) => {
  try {
    if (!filePaths.length) return null;
    const paths = await Promise.all(
      filePaths.map(async (path) => {
        const response = await cloudinary.uploader.upload(path, {
          resource_type: "auto",
        });
        fs.unlinkSync(path);
        return response;
      })
    );

    return paths;
  } catch (error) {
    console.error(error);
    filePaths.forEach((filePath) => {
      fs.unlinkSync(filePath);
    });
    return null;
  }
};

export default uploadToCloudinary;
