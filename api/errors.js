module.exports = {
	// 1xx -- Connection Errors

	// 2xx -- Authorization & Permissions

	// 3xx -- App Sanity
	not_yet_implemented         : { code : 300, msg : 'Not Yet Implemented' },
	invalid_cassandra_nesting   : { code : 301, msg : 'Invalid Cassandra Nesting -- Can only be one level deep' },

	// 4xx -- Internal Data Validation
	require_plain_object_or_key : { code : 400, msg : 'Expected plain object or key' },

	// 4xx -- External Data Validation
	invalid_address_id          : { code : 500, msg : 'Invalid Address' },
	invalid_credit_card_id      : { code : 501, msg : 'Invalid Credit Card' }
};