
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + "/public"));


app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.get('/users.html', function(req, res){
  res.send("respond with a resource");
});

app.get('/archive.html', function (req, res) {
  res.render('archive');
});

app.get('/about.html', function (req, res) {
  res.render('about');
});

app.get('/contributors.html', function (req, res) {
  res.render('contributors');
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
})
