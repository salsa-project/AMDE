const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({destination: __dirname + '/../views/resources/images',
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

//index page
router.get('/', (req,res)=>{
  res.render('index');
})

//multer image upload
router.post('/upload', (req, res) => {
  upload(req, res, (err)=>{
    if(err){
      // res.render('index', {msg: err})
      res.json({status: 'ERROR', err: err})
      throw err;
    }else{
      if(req.file == undefined){
        // res.render('index', {msg: 'Error: No File Selected!'})
        res.json({status: 'DONE But Undefined'})
      }else{
        // res.render('index', {msg: 'Error: File Uploaded!', file: `/resources/images/${req.file.filename}`})
        const postTitle = JSON.parse(JSON.stringify(req.body))['post-title'];
        console.log(postTitle);
        const postPhoto = `/resources/images/${req.file.filename}`;
        console.log(postPhoto);
        const postBody = JSON.parse(JSON.stringify(req.body))['post-body'];
        console.log(postBody);
        res.json({file: `/resources/images/${req.file.filename}`})
      }
    }
  })
});

module.exports = router;
