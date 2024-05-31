var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
<<<<<<< HEAD
var reclamationRouter = require('./routes/Reclamation');
var reponseRouter = require('./routes/Reponse');
const Reponse = require('./models/Reponse');

=======
var accessoireRoutes = require('./routes/accessoireRoutes');
const categorieFavorieRoutes = require('./routes/categorieFavorieRoutes');
var categorieAccessoireRoutes = require('./routes/categorieAccessoireRoutes');
const {notFoundError, errorHandler} = require("./middlewares/errorHandler");
>>>>>>> main
var connectionString = process.env.CONNECTION_STRING ?? "mongodb://localhost:27017/Projet"
const annonceRouter = require('./routes/annonce');
const reservationRouter = require('./routes/Reservation');
require('./middlewares/LogicArchiveAnnonce');
const {notFoundError, errorHandler} = require("./middlewares/errorHandler");



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

app.use('/accessoires', accessoireRoutes);
app.use('/categories', categorieAccessoireRoutes);
app.use('/', indexRouter);
app.use('/reclamations', reclamationRouter);
app.use('/reponses', reponseRouter);
app.use('/users', usersRouter);
app.use('/categorie-favories', categorieFavorieRoutes);
app.use('/annonce', annonceRouter);
app.use('/reservation', reservationRouter);


// catch 404 and forward to error handler
<<<<<<< HEAD
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(5000);
=======
app.use(notFoundError);
app.use(errorHandler);

>>>>>>> main

app.listen(5000);
module.exports = app;
