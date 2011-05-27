var hashlib = require('hashlib'),
       salt = require('./../security/salt'),
       step = require('step');

module.exports.params = {
	auth_token : {type : 'string'},
	first_name : {type : 'string'},
	last_name  : {type : 'string'},
	email      : {type : 'string', required   : true},
	region_id  : {type : 'int'   },
	password   : {type : 'string'},
	activated  : {type : 'string', restricted : true}
};

module.exports.steps = step.fn(function(){
	MODELS.User.get(this.shared.p.data.email, this);

}, function(users){
	if(users.length){ throw new Error('email_taken'); }
	
	var p = this.shared.p

	MODELS.User.add({
		email          : this.shared.email,
		first_name     : this.shared.first_name,
		last_name      : this.shared.last_name,
		primary_region : this.shared.region_id,
	}, this);
	
}, function(user){
	var p = this.shared.p;

	if(p.data.password){
		user
			.setPassword ( hashlib.sha256( salt.sprintf( p.data.password, users.uid ) ) )
			.save        ( this );
	}else{
		this();
	}

}, function(){
	this.shared.p.cb();
});