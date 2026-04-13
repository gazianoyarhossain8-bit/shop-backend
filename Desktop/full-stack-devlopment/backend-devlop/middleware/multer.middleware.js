import multer from 'multer';
import path from 'path';
// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {   
    cb(null, 'images/'); // Directory to save uploaded files
  }
    ,
    filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  }
});
// Initialize multer with the defined storage engine
const upload = multer({ storage: storage });
export default upload;