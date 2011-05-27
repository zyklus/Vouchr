module.exports = {
	// 1xx -- Connection Errors

	// 2xx -- Authorization & Permissions

	// 3xx -- App Sanity
	not_yet_implemented       : { code : 100, msg : 'Not Yet Implemented' },
	invalid_cassandra_nesting : { code : 101, msg : 'Invalid Cassandra Nesting -- Can only be one level deep' },

	// 4xx -- Data Validation
	invalid_address_id        : { code : 400, msg : 'Invalid Address' },
	invalid_credit_card_id    : { code : 401, msg : 'Invalid Credit Card' }
};