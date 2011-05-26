/*  - Tokens[token]
 *  	- id_user
 *  	- ip
 *  	- expires
 */

var klass = require('./klass'),
  hashlib = require('vouchr_hashlib');

module.exports = klass({
	schema : {
		key     : 'token',
		token   : String,
		user    : MODEL.User,
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
});