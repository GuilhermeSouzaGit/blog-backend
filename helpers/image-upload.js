const multer = require("multer");
const fs = require("fs");
const path = require("path");

const imageUpload = () => {
    const storage = multer.memoryStorage()

    return multer({ storage: storage });
};

module.exports = imageUpload;
