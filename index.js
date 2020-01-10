var express = require("express");
var mongoose = require("mongoose");
var morgan = require('morgan');
var userController = require('./controller/userController');
const cors = require('cors');
var dbConfig = require('./dbConfig/dbConfig');
var dotenv = require('dotenv').config();
const uploadRouter = require('./controller/imageUpload');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true }));
// app.use(upload.array()); 
app.use(express.static(__dirname + "/public"));


mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

app.post('/v1/signup', userController.hashGen, userController.registerUser);

app.post('/login', userController.login);

app.use('/upload', uploadRouter);


app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});


