import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));   // cb => callBack
  }, // in modules of node.js like multer we use cb(error value, return value).
  // __dirname is the directory name of the current module, ".." goes one level up, and "uploads" is the folder where files will be stored.
  // path.join is used to join the directory names in a platform-independent way
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + path.extname(file.originalname)); //path.extname extracts the extensions like .jpeg, .png...
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /\.(jpeg|jpg|png|gif)$/i;
  const isvalid = allowedTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );

  if (isvalid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 },
});

export default upload;
