var express = require('express');
var profileRouter = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

const cors = require('./cors');
profileRouter.options('*', cors.corsWithOptions, (req, res) => {   res.header('Content-Type', 'application/json');
res.header("Access-Control-Allow-origin", "*");
res.header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, OPTIONS'); res.statusCode=200; res.json("okkk"); } );


profileRouter.get('/', authenticate.verifyUser, (req, res, next) => {
    User.find({_id: req.user.id})
    .then((response) => {
        res.statusCode=200
        res.setHeader("Content-Type", "application/json")
        res.json(response)
    })
    .catch((err) => next(err))
})
.post('/',authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json("POST operation on this api route is not allowed")
})
.patch('/', authenticate.verifyUser, (req, res, next) => {
    if(req.body.name && req.body.email){
        User.updateMany({ _id: req.user.id }, {$set: { name: req.body.name, email: req.body.email}})
        .then((resp) => {
            User.find({_id: req.user.id})
             .then((resp) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(resp)
             })            
            
        }).catch((err) => next(err))
    }
    else if(req.body.email){
        User.updateOne({ _id: req.user.id}, {$set: { email: req.body.email}})
        .then((resp) => {
             User.find({_id: req.user.id})
             .then((resp) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(resp)
             })       
            
        }).catch((err) => next(err))
    }

    else if(req.body.name){
        User.updateOne({ _id: req.user.id }, {$set: { name: req.body.name}})
        .then((resp) => {
            User.find({_id: req.user.id})
            .then((resp) => {
               res.statusCode = 200;
               res.setHeader("Content-Type", "application/json");
               res.json(resp)
            })    
            
        }).catch((err) => next(err))
    }
    
    

})

module.exports = profileRouter






