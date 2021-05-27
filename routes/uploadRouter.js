const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const user = require('../models/user');
const sharp = require('sharp')
var User = require('../models/user');
const cloudinary = require("cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");


const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


var storage = multer.diskStorage({ })

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "samples",
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
//     });


 const imageFilter = (req,file,cb) => {
     
     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
         return cb(new Error("You can upload only image files!"),false);
     }
     console.log(file)
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
.post(authenticate.verifyUser, upload.single('imageFile'), async (req, res) => {
    
    var publicId = `samples/${req.user.id}`;
    // cloudinary.image(req.file.path, {secure: true, transformation: [
    //     {width: 150, height: 150, gravity: "face", crop: "thumb"},
    //     {radius: 20},
    //     {effect: "sepia"},
    //     {overlay: "cloudinary_icon_blue", gravity: "south_east", x: 5, y: 5, width: 50, opacity: 60, effect: "brightness:200"},
    //     {angle: 10}
    //     ]})

        const result =  await cloudinary.v2.uploader.upload(req.file.path, 
        {resource_type: "image", public_id: publicId,
        overwrite: true, },
        function(error, result) {console.log(result, error)});
        
        if(result){
            console.log("LINE 74->",result)
            User.updateOne({ _id: req.user.id}, {$set: { avatar: result.secure_url}})
            .then((resp) => {
                 User.find({_id: req.user.id})
                 .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(resp)
                 })       
                
            }).catch((err) => next(err))
        }

    // console.log(req.file)
    // const image={};
    // image.url = req.file.url;
    // image.id = req.file.public_id;


})

module.exports = uploadRouter;