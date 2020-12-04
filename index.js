var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function (req, res, next) {
    res.render('index');
});

app.use(function (req, res, next) {
    res.status(404);
    res.render("404");
});

app.use(function (err, req, res, next) {
    res.status(500);
    res.render("error", { error: err });
});

module.exports = app;
