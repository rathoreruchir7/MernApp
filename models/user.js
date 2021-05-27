const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    name: {
      type: String,
        default: ''
    },
    email: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    },
    avatar: {
      type: String,
      default: ""
  }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
