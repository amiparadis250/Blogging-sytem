import multer from 'multer';

const createMulterInstance = (folder) => {
  const storage = multer.diskStorage({});

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  };

  return multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, 
    fileFilter
  });
};

export default createMulterInstance;