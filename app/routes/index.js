import multer from 'multer'
import fs from 'fs'
const upload = multer({ dest: 'uploads/' })

export default (app, passport) => {
  app.route('/')
    .get((req, res) => {
      res.render('index', { pageTitle: 'File Metadata Microservice!' })
    })

  app.post('/api/fileanalyse', upload.single('the-file'), (req, res, next) => {
    const { size, path } = req.file
    res.json({ fileSize: size })
    fs.unlink(path)
  })
}
