/**
 * Events
 *
 * beforeCreate
 * afterCreate
 * beforeSave
 * afterSave
 * beforeGet
 * afterGet
 * beforeRemove
 * afterRemove
 **/

/**
 * Notes
 *
 * - Anything in schema that is an array should have add/remove methods automatically added, e.g.:
 *
 *     addresses : []
 *     ---
 *     methods.addAddress
 *     methods.removeAddress
 *     methods.getAddresses
 */

var         $ = require('language_helpers'),
            p = Array.prototype,
    pluralize = require('pluralize');

function root(){}

module.exports = function(){
	function klass(parent){
		// sub-klasses in this context should refer to their parent
		this.defineProperty('this', parent instanceof root ? parent : this);
	};

	klass.defineProperty('configure', configureKlass);
	klass.prototype = $.extend(new root(), klassPrototype);

	return klass;
};

function configureKlass( conf, nested ){
	this.defineProperties({
		__values__ : {}
	});

	var conf = $.extend(
		{ schema:{}, required:{}, validators:{}, methods:{}, observers:{} },
		conf
	);

	// convert all private properties into non-mutatable __PROP__, e.g. .schema --> .__schema__
	for(var prop in conf){
		conf['__' + prop + '__'] = conf[prop];
		delete conf[prop];
	}
	this.prototype.defineProperties( conf, nested );

	// define getters and setters
	defineGettersAndSetters.call( this.prototype, conf.__schema__ );
	console.log(this.prototype);
}

var klassPrototype = {
	add : function( data ) {
		
	},

	get : function( data, cb ) {
		
	},

	remove : function( data, cb ){
		
	},

	/**
	 * Clone everything from Array.prototype to make this act as an array
	 **/
	length      : 0,
	size        : function(){ return this.length; },
	push        : p.push,
	sort        : p.sort,
	splice      : p.splice,
	slice       : p.slice,
	shift       : p.shift,
	unshift     : p.unshift,
	pop         : p.pop,
	concat      : p.concat,
	every       : p.every,
	filter      : p.filter,
	forEach     : p.forEach,
	map         : p.map,
	reduce      : p.reduce,
	reduceRight : p.reduceRight,
	reverse     : p.reverse,
	some        : p.some
};

// `this` in the following function refers to a `klass.prototype`, NOT a `klass`
function defineGettersAndSetters( schema, nested ){
	var getter, setter, uProp, cls, inherit = {};

	for(var prop in schema){
		if( prop == 'key' ){ continue; }

		uProp = prop.toUpperCaseFirst();

		if(schema[prop] instanceof root){
			// if type is another model
			this.defineProperty( 'get' + uProp, { enumerable: true, value: getRemoveField.bindArgs( prop ) } );
			this.defineProperty( 'set' + uProp, { enumerable: true, value: setRemoveField.bindArgs( prop ) } );

		}else if( $.isArray( schema[prop] ) ){
			// Array of objects...
			if(schema[prop].length == 1){

				// of type...
				if((cls = schema[prop][0]).prototype instanceof root){
					// Models				
					this.defineProperty( 'get'    + uProp, { enumerable: true, value: getRemoteFieldAry   .bindArgs( prop, cls ) } );
					this.defineProperty( 'add'    + uProp, { enumerable: true, value: addRemoteFieldAry   .bindArgs( prop, cls ) } );
					this.defineProperty( 'remove' + uProp, { enumerable: true, value: removeRemoteFieldAry.bindArgs( prop, cls ) } );
				}else{
					// Normal objects
					this.defineProperty( 'get'    + uProp, { enumerable: true, value: getField      .bindArgs( prop ) } );
					this.defineProperty( 'add'    + uProp, { enumerable: true, value: addFieldAry   .bindArgs( prop ) } );
					this.defineProperty( 'remove' + uProp, { enumerable: true, value: removeFieldAry.bindArgs( prop ) } );

					// not sure if I should be adding this, but what the hell
					this.defineProperty( prop, { enumerable: true, get : getField.bindArgs( prop ) } );
				}
			}else{
				// of a set
			}

		}else if( $.isPlainObject( schema[prop] ) ){
			// Nested properties

			// Can only be nested one-level deep due to Cassandra
			if(nested){
				throw new Error('invalid_cassandra_nesting');
			}else{
				// .info is a special nesting that gets pushed into the parent
				if( prop == 'info' ){
					defineGettersAndSetters.call(this, schema[prop], true);

				} else {
					inherit[ prop ] = new (module.exports)(this);
					inherit[ prop ].configure( schema[prop], true )
				}
			}

		}else{
			// "Normal" object, can set/get directly
			this.defineProperty( prop, {
				enumerable : true,
				       get : getter = getField.bindArgs( prop ),
				       set : setter = setField.bindArgs( prop )
			});

			this.defineProperty( 'get' + uProp, { enumerable: true, value: getter } );
			this.defineProperty( 'set' + uProp, { enumerable: true, value: setter } );
		}
	}

	if( !$.isEmptyObject( inherit ) ){
		this.defineProperty( '__inherit__', inherit );
	}
}

/**
 * GETTERS AND SETTERS FOR...
 **/

// normal objects
function setField( field, data ){
	this.__values__[field] = data;
}

function getField( field ){
	return this.__values__[field];
}


// normal object arrays
function addFieldAry( field, value ){
}

function removeFieldAry( field, value ){
}


// linked Models
function getRemoteField( field, cb ){
}

function setRemoteField( field, value, cb ){
}


// linked Model Arrays
function getRemoteFieldAry( field, cb ){
}

function addRemoteFieldAry( field, cb ){
}

function removeRemoteFieldAry( field, cb ){
}