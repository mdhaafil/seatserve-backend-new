"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const uploadFile = async (req, h) => {
    try {
        const payload = req.payload;
        if (!payload || !payload.file) {
            return h.response({ error: "File missing" }).code(400);
        }
        const savedPath = saveUploadedFile(payload.file);
        return h
            .response({
            message: "File uploaded successfully",
            path: savedPath,
        })
            .code(200);
    }
    catch (error) {
        return h.response({ error: error.message }).code(400);
    }
};
exports.uploadFile = uploadFile;
function saveUploadedFile(file) {
    throw new Error("Function not implemented.");
}
