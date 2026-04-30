import multer from "multer";
import pkg from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js";

const { CloudinaryStorage } = pkg;

const storage = new CloudinaryStorage({
    cloudinary,
    folder: "chat-images",
    allowedFormats: ["jpg", "png", "gif", "jpeg","bmp", "webp","mp4"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const upload = multer({ storage });
export default upload;