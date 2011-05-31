/*  - CreditCards[uuid]
 *  	- id_address
 *  	- cc_num
 *  	- cvv2
 *  	- last4
 *  	- first_name
 *  	- last_name
 *  	- exp_month
 *  	- exp_year
 *  	- type
 *  	- deleted
 */

var hashlib = require('vouchr_hashlib'),
     MODELS = require('./');

module.exports = {
	dbName : 'CreditCards',

	schema : {
		key        : 'uuid',
		uuid       : String,

		address    : MODELS.Address,
		cvv2       : String,
		last4      : MODELS.Integer,
		first_name : String,
		last_name  : String,
		exp_month  : MODELS.Integer,
		exp_year   : MODELS.Integer,
		type       : ['VISA', 'AMEX', 'MASTERCARD', 'DISCOVER'],
		deleted    : Boolean
	},

	required : ['address', 'cvv2', 'first_name', 'last_name', 'exp_month', 'exp_year'],

	validators : {
		exp_month : function(){
			return (this.month < 1) || (this.month > 12) || ((this.year == (new Date).getFullYear()) && (this.month <= (new Date).getMonth()));
		},
		exp_year  : [ (new Date).getFullYear(), ],
		last4     : [ 1000, 9999 ]
	},

	observers : {
		// do not expose the token if it's expired
		afterGet : function(){
		},

		afterCreate : function(){
			this.token || ( this.token = hashlib.guid() );
		}
	}
};