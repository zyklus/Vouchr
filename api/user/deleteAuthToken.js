var step = require('step');

module.exports.params = {
	auth_token : {type : 'string', required : true}
};

module.exports.steps = step.fn(function(){
	var p = this.shared.p;

	// immediately return.  No need to wait for the actual token to be deleted
	p.cb({ clearAuthToken : true, __hide : ['clearAuthToken'] });

	MODELS.Tokens.remove(p.authToken.token);
});