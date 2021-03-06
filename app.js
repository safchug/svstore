var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');

var db = require("./model/Database");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var registration = require('./routes/registration');
var api = require("./routes/api");
var initMiddleWare = require('./middlewares/init');
var initBaketMiddleware = require('./middlewares/initBasket');
var menager = require('./routes/menager/menager');
var goods = require("./routes/goods");
var salesman = require('./routes/salesman/salesman');
var addGoods = require('./routes/salesman/addGoods');
var viewLot = require('./routes/viewlot');
var basket = require('./routes/basket');
var cookiesManipulation = require('./utils/cookiesManipulation');
var sampler = require('./routes/addingSamplersInDb');
var order = require('./routes/order');
var reactRoute = require('./routes/react');

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
app.use(fileUpload());
app.use(bodyParser({defer: true}));

app.use(initMiddleWare);
app.use(initBaketMiddleware);

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


//goods
app.get('/goods/pc', goods.firstPage);
app.get('/goods/pc/:id', goods.nextPage);
app.get('/goods/pc/view/:id', viewLot.from);
//cellphones
app.get('/goods/cellphones', goods.firstPage);
app.get('/goods/cellphones/:id', goods.nextPage);
app.get('/goods/cellphones/view/:id', viewLot.from);
//leptops
app.get('/goods/leptops', goods.firstPage);
app.get('/goods/leptops/:id', goods.nextPage);
app.get('/goods/leptops/view/:id', viewLot.from);
//headphones
app.get('/goods/headphones', goods.firstPage);
app.get('/goods/headphones/:id', goods.nextPage);
app.get('/goods/headphones/view/:id', viewLot.from);
//Tv
app.get('/goods/tv', goods.firstPage);
app.get('/goods/tv/:id', goods.nextPage);
app.get('/goods/tv/view/:id', viewLot.from);
//Tv
app.get('/goods/routers', goods.firstPage);
app.get('/goods/routers/:id', goods.nextPage);
app.get('/goods/routers/view/:id', viewLot.from);

app.get('/order', order.form);
app.post('/order', order.makeOrder)

//salesman
app.get('/salesman', salesman.form);
app.get('/addgoods', addGoods.form);
app.post('/addgoods', addGoods.upload);


//api
app.post('/api/login', api.chackLogin);
app.post('/api/addtobasket', api.addToBasket);
app.post('/api/getbasketlist/', api.getBasketList);
app.post('/api/removebasketitem', api.removeBasketItem);

app.get('/clearcookies', cookiesManipulation.clearCookies);
app.get('/addsamplers', sampler.form);
app.post('/addlist', sampler.addSamplerListToDb);
app.get('/react', reactRoute.form);

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
