var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
require('./model/index');

//  类似mysql表  mogngo中的的字段  文档
// const User = mongo.model('user',new mongo.Schema({
//     user:{
//         type: String,
//         require: true
//     },
//     age: {
//         type: Number,
//         require: true
//     }
// }));

// User.update({user:'zj'}, {$set:{age:99}},(err,doc) => {
//     if(!err) {

//     }
// })

// User.create({
//     user: 'zj',
//     age: 243
// },(err,doc) => {
//     if(!err) {
//         console.log(doc);
//     }
// });

// app.get('/data', (req,res) => {
//     User.findOne({user:'zj'},(err,doc) => {
//         res.send(doc)
//     })
// })


// 跨域配置
// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (req.method == 'OPTIONS') { res.send(200); /让options请求快速返回/ } else { next(); }
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
