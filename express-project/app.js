var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const annonceRouter = require('./routes/annonce');
const reservationRouter = require('./routes/Reservation');
require('./middlewares/LogicArchiveAnnonce');
var connectionString = process.env.CONNECTION_STRING  ?? "mongodb://localhost:27017/Projet"
const {notFoundError, errorHandler} = require("./middlewares/errorHandler");

var connectionString = process.env.CONNECTION_STRING ?? "mongodb://localhost:27017/Projet"
var app = express();
mongoose.connect(connectionString).then(() => console.log("Connection Successful"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/annonce', annonceRouter);
app.use('/reservation', reservationRouter);

// catch 404 and forward to error handler
app.use(notFoundError);
app.use(errorHandler);


app.listen(5000);
module.exports = app;
