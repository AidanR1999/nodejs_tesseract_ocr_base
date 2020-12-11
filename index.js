const express = require('express');
const app = express();
const multer = require('multer');
const ts = require('tesseract.js');

// create storage for files
const storage = multer.diskStorage({
    destination:(req, file, cb)=> {
        cb(null, './uploads/');
    },
    filename:(req, file, cb)=> {
        cb(null, file.originalname)
    }
})

// middleware for handling multipart/form-data
// primarily used for uploading files.
const upload = multer({storage:storage});


// basic upload files POST: to /api/upload folder 
app.post('/api/uploads', upload.single('uploadedImage'), (req, res)=>{
    console.log(req.file);

    // use tesseract ocr library to perform ocr
    try {
        ts.recognize(
            'uploads/' + req.file.filename,
            'eng',
            {logger:m=>console.log(m)}
        ).then(({data: {text}})=>{
        //    display results
            return res.json(
               {
               message:text
            }
        ) 
    })
    }catch(error) {
        console.log(error);
    }
})

// start up basic server
app.listen(4000, ()=> {
    console.log('server is up, port 4000');
})