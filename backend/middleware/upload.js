// For Express, you need a package called multer to receive uploaded files.
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed"));
        }

        cb(null, true);
    },
});

module.exports = upload;