var express = require('express');
var profileRouter = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

profileRouter.get('/', authenticate.verifyUser, (req, res, next) => {
    User.find({_id: req.user.id})
    .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response)
    })
})

module.exports = profileRouter