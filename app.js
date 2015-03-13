// Module dependencies.

var express = require('express');
var http = require('http');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');

var app = express();
server = http.createServer(app);
var io = require('socket.io').listen(server);
exports.io = io;

var routes = new Array();
require("fs").readdirSync(path.join(__dirname, 'routes')).forEach(function(file) {
  if (file.match(/.+\.js$/g) !== null) {
    var name = file.replace('.js', '');
    routes[name] = require(path.join(__dirname, 'routes/') + file);
  }
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('layout', 'layout');
  app.use(expressLayouts);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index.main);
app.get('/login', routes.login.main);
app.post('/loginweb', routes.loginweb.main);
app.get('/logout', routes.logout.main);
app.get('/signup', routes.signup.main);
app.post('/signupweb', routes.signupweb.main);
app.get('/submit', routes.submit.main);
app.get('/about', routes.about.main);
app.get('/profile', routes.profile.main);
app.get('/user/:name', routes.user.main);
app.post('/postcontent', routes.postcontent.main);
app.get('/p/:id', routes.post.main);
app.post('/comment', routes.comment.main);
app.post('/followuser', routes.follow.main);
app.post('/unfollowuser', routes.unfollow.main);
app.post('/like', routes.like.main);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
