import multer from "multer"
import DataParser from "datauri/parser.js"
import path from "path"

const storageAvatar = multer.memoryStorage()

const parser = new DataParser()

export const formatImage = (file) => {
    const fileExtension = path.extname(file.originalname).toString()
    return parser.format(fileExtension, file.buffer).content
}
const uploadAvatar = multer({ storage: storageAvatar }).single("avatar")
export default uploadAvatar