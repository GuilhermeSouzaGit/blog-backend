const multer = require("multer");

const imageUpload = () => {
    const storage = multer.memoryStorage()

    return multer({ storage: storage });
};

module.exports = imageUpload;
