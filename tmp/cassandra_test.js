var cassandra = require('cassandra');
var client    = new cassandra.Client("Keyspace", "host:port");
var CL        = cassandra.ConsistencyLevel;

client.consistencyLevel({
  write: CL.ONE,
  read: CL.ONE
});

client.connect("SomeKeySpace");
var cf = client.getColumnFamily("SomeColumnFamily");

var data = cf.get("key", function(err, data) {
  // play with data
  console.log(data.columnName);
});