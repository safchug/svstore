var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var db = require("./model/Database");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var registration = require('./routes/registration');
var api = require("./routes/api");
var initMiddleWare = require('./middlewares/init');
var menager = require('./routes/menager/menager');
var salesman = require('./routes/salesman/salesman');

var app = express();

//creating MongoClient;
db();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'strore',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
  },
  store: new MongoStore({
    url: db.url
  })
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(initMiddleWare);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.get('/regist', registration.form);
app.post('/regist', registration.regist);
app.get("/greetings", registration.greetings);

//menager
app.get("/menager", menager.form);
app.get("/sellings", menager.sellings);
app.get('/approve', menager.approveForm);
app.post('/approvesalesman', menager.approveSalesman);
app.post("/regect", menager.reject);

//salesman
app.get('/salesman', salesman.form);

//api
app.post('/api/login', api.chackLogin);

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
