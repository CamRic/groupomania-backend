const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(req.body)
        callback(null, 'images')
    },

    filename: (req, file, callback) => {
        console.log(req.body)
        console.log(req.body.title)
        const topic = req.body.title
        const extension = MIME_TYPES[file.mimetype]
        const name = topic.split(' ').join('_')
        callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage }).single('file')