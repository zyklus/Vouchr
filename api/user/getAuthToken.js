var hashlib = require('hashlib'),
       salt = require('./../security/salt'),
       step = require('step');

module.exports.params = {
	email     : {type : 'string', required : true},
	password  : {type : 'string', required : true},
	permanent : {type : 'bool'}
};

module.exports.steps = step.fn(function(){
	var p = this.shared.p,

	MODELS.User.get(p.email, this);

}, function(users){
	users.filter( function(){
		return this.password == hashlib.sha256(salt.sprintf( p.data.password, this.uid ));
	} );

	if( !users.length ){ throw new Error('invalid_credentials'); }

	var   p = this.shared.p,

	// see if there is an existing token that hasn't yet expired
	   time = ( Date.now() / 1000 ) >> 0;

	this.shared.ip      = p.req.remoteAddress;
	this.shared.expires = time + 60 * p.config.authToken[ p.data.permanent ? 'permanentLifeInMinutes' : 'lifeInMinutes' ];

	MODELS.Token.get({
		id_user         : users.email,
		ip              : this.shared.ip,
		'expires_at >=' : time
	}, this);

}, function( tokens ){
	var p = this.shared.p;

	// update existing token
	if( tokens.length ){
		this.shared.tokenID = tokens.token;
		tokens.setExpires( this.shared.expires ).save( this );
	} else {
		MODELS.Token.add({
			id_user : p.data.email,
			ip      : this.shared.ip,
			expires : this.shared.expires
		});
	}

}, function( err, newToken ){
	this.shared.p.cb({
		auth_token : newToken.token,
		user_id    : this.shared.user.email,
		expires_at : this.shared.expires,

		__hide     : ['user_id', 'expires_at', 'auth_token']
	});
});