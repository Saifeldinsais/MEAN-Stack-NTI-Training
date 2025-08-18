const multer = require("multer")
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'taskPhoto') {
      cb(null, 'uploads/tasks'); // For task photos
    } else if (file.fieldname === 'photo') {
      cb(null, 'uploads'); // For user profile pictures
    } else {
      cb(new Error('Invalid field name for file upload'), null);
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];

    let filename;

    if (file.fieldname === 'taskPhoto') {
      filename = `task-${Date.now()}.${ext}`;
    } else if (file.fieldname === 'photo') {
      filename = `user-${Date.now()}.${ext}`;
    } else {
      return cb(new Error('Invalid file field name'), null);
    }

    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split("/")[0];
    if(imageType === "image"){
        return cb(null, true);
    }
    cb(new Error("File is not an image"), false);
}

const upload = multer({storage: diskStorage, fileFilter });
module.exports = upload;
