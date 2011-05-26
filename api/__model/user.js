/*  - Users[email]
 *  	- info
 *  		- uid(=rand)
 *  		- first_name
 *  		- last_name
 *  		- password
 *  		- primary_address
 *  		- primary_credit_card
 *  		- primary_region
 *  		- deleted
 *  	- []companies             # admin of company
 *  	- []credit_cards
 *  	- []addresses
 *  	- []groups
 *  	- []coupons
 *  	- []regions
 */

var klass = require('./klass'),
  hashlib = require('vouchr_hashlib');

module.exports = klass({
	schema : {
		key   : 'email',
		email : '',

		info : {
			uid               : String,
			name              : String,
			password          : String,
			activationKey     : String,
			primaryAddress    : MODEL.Address    ,
			primaryCreditCard : MODEL.CreditCard ,
			primaryRegion     : MODEL.Region     ,
			deleted           : Boolean
		},

		creditCards : [ MODEL.CreditCard ],
		addresses   : [ MODEL.Address    ],
		groups      : [ MODEL.Group      ],
		coupons     : [ MODEL.Coupon     ],
		regions     : [ MODEL.Region     ]
	},

	required : ['email'],

	validators : {
		email    : /^.+@.+\..+/, // TODO: better validation
		password : /^(?=.{6})/
	},

	methods : {
		setPrimaryAddress : function( conf ){
		},

		setPrimaryCreditCard : function( conf ){
		},

		setPrimaryRegion : function( conf ){
		}
	},

	observers : {
		onCreate : function(){
			this.uid || ( this.uid = hashlib.guid() );
		}
	}
});