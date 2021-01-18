var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var upload = require('multer')();
var transfer = require('./transfer');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
    res.render('index');
});

app.post('/api/transfer', upload.single('s_img'), function (req, res, next) {
    console.log(req.file.buffer);
    transfer.style_img(req.file, res, next);
});

app.use(function (req, res, next) {
    res.status(404);
    res.render("404");
});

// app.use(function (err, req, res, next) {
//     res.status(500);
//     res.render("error", { error: err });
// });

module.exports = app;
