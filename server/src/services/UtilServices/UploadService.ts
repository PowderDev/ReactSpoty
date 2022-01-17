import multer, { FileFilterCallback } from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log(file.originalname, file.fieldname)
        const dest = path.join('..', 'uploads', `${file.fieldname.replace("s", "") + "s"}`)
        cb(null, dest)
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.originalname.replace(path.extname(file.originalname), "")}-${new Date().toISOString().substring(0, 10)}(${new Date().toISOString().substring(0, 10)})${path.extname(file.originalname)}`
        )
    },
})


function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
    const filetypes = /image|audio/

    const mimetype = filetypes.test(file.mimetype)
    
    if (mimetype) {
        return cb(null, true)
    } else {
        cb(null, false)
    }
}


export const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },

})

