create keyspace Vouchr with replication_factor = 1 and placement_strategy = 'org.apache.cassandra.locator.SimpleStrategy';

use Vouchr;

create column family Users       with column_type='Super' and comparator='UTF8Type' and subcomparator='UTF8Type';
create column family UserGroups  with column_type='Super' and comparator='UTF8Type' and subcomparator='UTF8Type';
create column family Addressess  with column_type='Super' and comparator='UTF8Type' and subcomparator='UTF8Type';
create column family Companies   with column_type='Super' and comparator='UTF8Type' and subcomparator='UTF8Type';
create column family Deals       with column_type='Super' and comparator='UTF8Type' and subcomparator='UTF8Type';
create column family Tags        with column_type='Super' and comparator='UTF8Type' and subcomparator='UTF8Type';
create column family Categories  with column_type='Super' and comparator='UTF8Type' and subcomparator='UTF8Type';
create column family Regions     with column_type='Super' and comparator='UTF8Type' and subcomparator='UTF8Type';

create column family Tokens      with column_type='Standard' and comparator='UTF8Type';
create column family APIs        with column_type='Standard' and comparator='UTF8Type';
create column family Coupons     with column_type='Standard' and comparator='UTF8Type';
create column family CreditCards with column_type='Standard' and comparator='UTF8Type';