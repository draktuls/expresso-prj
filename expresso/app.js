var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('better-sqlite3')('expresso.db', { verbose: console.log });
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

console.log("[*] Testing SQLite!")
const row = db.prepare('SELECT * FROM users WHERE id = ?').get(1);
console.log(row.name, row.password, row.admin);

var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.locals.title = 'Expresso'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/', indexRouter);
app.use('/notes', notesRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
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

module.exports = app;
