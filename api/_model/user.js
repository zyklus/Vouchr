var klass = require('./klass');

module.exports = klass({
	key : 'email',
	info : {
		name              : '',
		password          : '',
		primaryAddress    : '',
		primaryCreditCard : '',
		primaryRegion     : '',
		deleted           : 0
	},
	creditCards : [],
	addresses   : [],
	groups      : [],
	coupons     : [],
	regions     : []
});