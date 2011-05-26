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

var klass = require('./klass'),
  hashlib = require('vouchr_hashlib');

module.exports = klass({
	schema : {
		key        : 'uuid',
		uuid       : String,
		address    : MODEL.Address
		cvv2       : String,
		last4      : MODEL.Integer,
		first_name : String,
		last_name  : String,
		exp_month  : MODEL.Integer,
		exp_year   : MODEL.Integer,
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

		onCreate : function(){
			this.token || ( this.token = hashlib.guid() );
		}
	}
});