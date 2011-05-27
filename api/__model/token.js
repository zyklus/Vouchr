/*  - Tokens[token]
 *  	- id_user
 *  	- ip
 *  	- expires
 */

var hashlib = require('vouchr_hashlib'),
     MODELS = require('./');

module.exports = {
	schema : {
		key     : 'token',
		token   : String,
		user    : MODELS.User,
		ip      : String,
		expires : Date
	},

	validators : {
		email    : /^.+@.+\..+/, // TODO: better validation
		password : /^(?=.{6})/
	},

	observers : {
		// do not expose the token if it's expired
		afterGet : function(){
		},

		onCreate : function(){
			this.token || ( this.token = hashlib.guid() );
		}
	}
};