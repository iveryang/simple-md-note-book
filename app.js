/**
 * Created by Yang_ruidong on 14-2-10.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var logger = require('tracer').colorConsole({level:'debug'});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('posts', path.join(__dirname, '/posts'));
app.set('view engine', 'jade');
app.set('logger', logger);
app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
//app.get('/', routes.index);
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
