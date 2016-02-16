
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');
var app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

// all environments
app.set('port', process.env.PORT || 3000);

// OLD
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + "/public"));

// OLD
// development only
// if ('development' == app.get('env')) {
//   // app.use(express.errorHandler());
// }

// app.use(function( req, res, next ) {
//   if( req.header( 'X-PJAX' ) ) {
//       req.pjax = true;
//       res.locals.pjax = true;
//   }
//   next();
// })

app.get('/', routes.index);

app.get('/users', user.list);

app.get('/archive', function (req, res) {
  res.render('archive');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/contributors', function (req, res) {
  res.render('contributors');
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
})
