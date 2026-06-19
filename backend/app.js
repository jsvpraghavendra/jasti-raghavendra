var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var stockRouter = require('./routes/stock');
var txRouter = require('./routes/transaction');
var portRouter = require('./routes/portfolio');

// REGISTER ROUTES (Crucial: Must be ABOVE the 404 handler)
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', stockRouter);
app.use('/api/orders', txRouter);
app.use('/api/cart', portRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.render('error');
});

// Database
mongoose.connect('mongodb://localhost:27017/stockapp')
    .then(() => console.log('Database Connected Successfully'))
    .catch(err => console.error(err));

module.exports = app;