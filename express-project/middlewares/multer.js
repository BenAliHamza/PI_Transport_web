
const multer = require('multer');
var path = require('path');

// Set the storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, 'image' + '-' + Date.now() + path.extname(file.originalname)); // specify the filename
  }
});

// Initialize the upload variable with the storage engine
const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image'); // .single for single file upload, field name should match in the client-side form


// Initialize the upload variable with the storage engine
const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('Images', 10); // .array for multiple file uploads, field name should match in the client-side form and specify the max count

// Check File Type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}



const uploaderSingle = (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      res.send({
        success: false,
        message: err.message
      });
    } else {
      console.log(req.file)
      console.log(req.body)
      next();
    }
  })
};

const uploaderMultiple =  (req, res, next) => {
  uploadMultiple(req, res, (err) => {
  if (err) {
    res.send({
      success: false,
      message: err
    });
  } else {
    if (req.files == undefined || req.files.length === 0) {
      res.send({
        success: false,
        message: 'No files selected!'
      });
    } else {
      const filePaths = req.files.map(file => `uploads/${file.filename}`);
      res.send({
        success: true,
        message: 'Files uploaded!',
        files: filePaths
      });
    }
  }
});
}
module.exports = {uploaderMultiple, uploaderSingle}
