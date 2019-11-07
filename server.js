const express = require('express');
const path = require('path');
const multer = require('multer');

const keys = require('./configs/keys');

const storage = multer.diskStorage({destination: __dirname + '/views/resources/images',
filename: function(req, file, cb){
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}});

//init upload for multer
const upload = multer({storage: storage,
                       limits: {
                         fileSize: 1000000
                       },
                       fileFilter: function(req, file, cb){
                         checkFileType(file, cb);
                       }
                     }).single('photo');

//SECURITY PART OF FILE UPLOADING
//check the uploaded files
function checkFileType(file, cb){
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  }else{
    cb('Error: Images Only!')
  }
}

const app = express();
const PORT = keys.PORT.PORT;

//SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
  res.render('index');
})

app.post('/upload', (req, res) => {
  upload(req, res, (err)=>{
    if(err){
      res.render('index', {msg: err})
    }else{
      if(req.file == undefined){
        res.render('index', {msg: 'Error: No File Selected!'})
      }else{
        res.render('index', {msg: 'Error: File Uploaded!', file: `/resources/images/${req.file.filename}`})
      }
    }
  })
});


app.listen(PORT, console.log(`Server running on PORT : ${PORT}`));
