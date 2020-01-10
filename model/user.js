var mongoose = require('mongoose');

var userDetails = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        required: false
    },
});

module.exports = mongoose.model("User", userDetails);