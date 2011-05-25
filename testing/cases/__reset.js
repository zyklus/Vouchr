var step = require('step');

module.exports = step.fn(
	function(cassandra, cb){
		this.shared.cb = cb;
		var group = step.group();

		['Users', 'UserGroups', 'Addresses', 'Companies', 'Deals', 'Tags', 'Categories', 'Regions', 'Tokens', 'APIs', 'Coupons', 'CreditCards'].each(
			function(family){
				cassandra.getColumnFamily(family).truncate(group());
			}
		);

	}, function(err, families){
		// Add an admin group/user directly via cassandra API
		var groups = cassandra.getColumnFamily('UserGroups'),
		     users = cassandra.getColumnFamily('Users');

		groups.set('Admin', {
			APIs : {
				'*' : 1
			},
			Users : {
				'foo@bar.com' : 1
			}
		}, this.parallel());

		users.set('foo@bar.com', {
			info : {
				name : 'Foo Bar'
			}
		}, this.parallel());

	}, function(err, group, user){
		this.shared.cb();
	}
);