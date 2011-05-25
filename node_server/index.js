global.$ = require('language_helpers');

var config = require('./../config'),
   express = require('express'),
       app = express.createServer(),
   bundler = require('./bundler'),
      path = require('path'),
      root = __dirname + '/../';

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);
});

var dev = function(){
	app.use(bundler(root + 'frontend', config))
	app.use(express.static(root + 'frontend'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.enable('hints');
};

app.configure('development'      , dev);
app.configure('local_development', dev);

app.configure('production', function(){
	app.use(bundler(root + 'frontend', config));
	app.use(express.static(root + 'frontend', { maxAge: 1000*60*60*24*365 }));
	app.use(express.errorHandler());
});