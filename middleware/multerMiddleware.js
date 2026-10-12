const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `IMG-${file.originalname}`);
  },
});

function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  // cb(null, false);

  // To accept the file pass `true`, like so:
  if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/webp' || file.mimetype == 'image/avif' ){
  cb(null, true);
  } 

  // You can always pass an error if something goes wrong:
  else{
  cb(new Error('Only PNG, JPEG, JPG, and WEBP images are allowed'), false);
  }
}

const multerConfig = multer({ storage, fileFilter });  
module.exports = multerConfig