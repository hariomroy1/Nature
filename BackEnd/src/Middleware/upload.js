const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads and images directories exist
const uploadDir = path.join(__dirname, '../../public/uploads');
const imageDir = path.join(__dirname, '../../public/images');

// Create directories if they do not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'text/plain') {
      cb(null, uploadDir); // Save text files to 'uploads' directory
    } else if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
      cb(null, imageDir); // Save images to 'images' directory
    } else {
      cb(new Error('Invalid file type, only JPG, JPEG, PNG, and TXT files are allowed!'), false);
    }
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
   
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/plain' || ['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPG, JPEG, PNG, and TXT files are allowed!'), false);
    }
  }
});

module.exports = upload;
