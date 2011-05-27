var   fs = require('fs'),
   klass = require('./__klass'),
  MODELS = {};

module.exports = MODELS;

// get all files in this directory
var files = fs.readdirSync( __dirname );  // It's just so much less worry to do this sync -- it's only running once!

// loop through all files in the directory and create empty classes for everything except `index` and `__*`
files.forEach(function( file ){
	if( ( file == 'index.js' ) || ( file.substr( 0, 2 ) == '__' ) ){ return; }

	// strip extensions off of file name and either:
	// - drop it in directly (starts with _)
	// - make it inherit from klass
	MODELS[/^_*(.+)(?=\.[^.]+$)/.exec(file)[1].replace(/(?:^|_)([a-z])/g, function(v, v){ return v.toUpperCase(); })] = 
		file.substr(0, 1) == '_'
			? require('./' + file)
			: new klass();
});
console.log(MODELS);
files.forEach(function( file ){
	if ( ( file == 'index.js' ) || ( file.substr( 0, 1 ) == '_' ) ){ return; }

	var obj = require('./' + file),
	  model = MODELS[/^.*(?=\.[^.]+$)/.exec(file)[0].replace(/(?:^|_)([a-z])/g, function(v, v){ return v.toUpperCase(); })];

	model.configure( obj );
});