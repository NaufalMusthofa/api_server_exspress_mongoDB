var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const mahasiswaRouter = require('./app/api/v1/mahasiswa/router');

const v1 = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to api Data mahasiswa",
    })
});

app.use(v1, mahasiswaRouter);

module.exports = app;
