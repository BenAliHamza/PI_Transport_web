var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var offreRouter = require("./routes/Offre");
var vehiculeRoutes = require("./routes/vehicule")
var connectionString = process.env.CONNECTION_STRING ?? "mongodb://localhost:27017/PI"
var reclamationRouter = require('./routes/Reclamation');
var reponseRouter = require('./routes/Reponse');
const Reponse = require('./models/Reponse');
const CategorieAccessoire = require('./models/categorieAccessoire.js');
const CategorieFavorie = require('./models/CategorieFavorie.js');

var accessoireRoutes = require('./routes/accessoireRoutes');
const categorieFavorieRoutes = require('./routes/categorieFavorieRoutes');
var categorieAccessoireRoutes = require('./routes/categorieAccessoireRoutes');
const { notFoundError, errorHandler } = require("./middlewares/errorHandler");
var connectionString = process.env.CONNECTION_STRING ?? "mongodb://localhost:27017/Projet"
const annonceRouter = require('./routes/annonce');
const reservationRouter = require('./routes/Reservation');
const subscriptionRouter = require("./routes/Subscription")
require('./middlewares/LogicArchiveAnnonce');



var app = express();


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
app.use('/offres', offreRouter)
app.use('/users', usersRouter);
app.use('/vehicules', vehiculeRoutes);
app.use('/subscriptions', subscriptionRouter);
app.use('/users', usersRouter);
app.use('/categorie-favories', categorieFavorieRoutes);
app.use('/annonce', annonceRouter);
app.use('/reservation', reservationRouter);

// hFAYEDH
app.use('/reclamations', reclamationRouter);
app.use('/reponses', reponseRouter);


app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(connectionString).then(() => console.log("Connection Successful"));
  app.listen(3000)
}
app.use(notFoundError);
app.use(errorHandler);

module.exports = app
