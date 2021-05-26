const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const user = require('../models/user');

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

var storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
 })

 const imageFilter = (req,file,cb) => {
     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
         return cb(new Error("You can upload only image files!"),false);
     }
     cb(null, true);
 }

const upload = multer({ storage: storage, fileFilter: imageFilter})

uploadRouter.route('/')
.get(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUplaod');
})
.post(authenticate.verifyUser, upload.single('imageFile'), async(req, res) => {

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    User.updateOne({ _id: req.user.id },  {$set: { avatar: buffer}})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', "image/png");
        res.json(resp);
    })
    

    
   
})

module.exports = uploadRouter;