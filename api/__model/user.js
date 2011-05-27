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

var hashlib = require('vouchr_hashlib'),
     MODELS = require('./');

module.exports = {
	schema : {
		key   : 'email',
		email : String,

		info : {
			uid               : String,
			name              : String,
			password          : String,
			activationKey     : String,
			primaryAddress    : MODELS.Address    ,
			primaryCreditCard : MODELS.CreditCard ,
			primaryRegion     : MODELS.Region     ,
			deleted           : Boolean
		},

		creditCards : [ MODELS.CreditCard ],
		addresses   : [ MODELS.Address    ],
		groups      : [ MODELS.Group      ],
		coupons     : [ MODELS.Coupon     ],
		regions     : [ MODELS.Region     ]
	},

	required : [ 'email' ],

	validators : {
		email    : /^.+@.+\..+/, // TODO: better validation
		password : /^(?=.{6})/
	},

	methods : {
		setPrimaryAddress : function( addr_id, cb ){
			this.__lock();

			// load all addresses for this user
			this.getAddresses(function( addrs ){
				this.__unlock();

				addrs = addrs.filter( addr_id );

				if(addrs.length){
					this.primaryAddress = addrs.eq(0);
					(cb || $.noop)();
				}else{
					(cb || $.noop)('invalid_address_id');
				}
			});
		},

		setPrimaryCreditCard : function( cc_id, cb ){
			this.__lock();

			// load all credit_cards for this user
			this.getCreditCards(function( cards ){
				this.__unlock();

				cards = cards.filder( cc_id );

				if(cards.length){
					this.primaryCreditCard = cards.eq(0);
					(cb || $.noop)();
				}else{
					(cb || $.noop)('invalid_credit_card_id');
				}
			});
		}
	},

	observers : {
		onCreate : function(){
			this.uid || ( this.uid = hashlib.guid() );
		}
	}
};