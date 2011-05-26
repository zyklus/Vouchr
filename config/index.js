var CL = require('cassandra').ConsistencyLevel;

var servers = {
	default : {
		http_port  : 80,
		https_port : 443,
		debug      : false,

		compress : {
			js   : true,
			html : true,
			css  : true
		},

		database : {
			keyspace    : 'Vouchr',
			consistency : {
				write : CL.QUORUM, // in a local environment QUORUM is identical to ONE, so this should never need to change
				read  : CL.QUORUM
			}
		},

		auth_token : {
			lifeInMinutes          : 60,
			permanentLifeInMinutes : 60*24*365
		}
	},

	local_development : {
		http_port  : 8001,
		https_port : 8002,
		debug      : true,
		host       : 'vouchr.local',

		compress : {
			js   : false,
			html : false,
			css  : false
		},

		database : {
			host : 'localhost',
			port : 9160
		}
	},

	development : {
		debug : true,
		host  : 'dev.vouchr.com',

		database : {
			keyspace : 'VouchrDev'
		}
	},

	production : {
		host : 'vouchr.com'
	},


	// this will extend from local_development server config
	local_development_testing : {
		database : {
			keyspace : 'VouchrTesting'
		}
	},

	// this will extend from development server config
	development_testing : {
		database : {
			keyspace : 'VouchrDevTesting'
		}
	}

	// this will extend from production server config
	production_testing : {
		database : {
			keyspace : 'VouchrTesting'
		}
	}
};

servers.local_development_testing = $.extend(true, servers.local_development_testing, servers.local_development);
servers.development_testing       = $.extend(true, servers.development_testing      , servers.local_development);
servers.production_testing        = $.extend(true, servers.production_testing       , servers.local_development);

module.exports = $.extend(true, {}, servers.default, servers[process.env.NODE_ENV]);