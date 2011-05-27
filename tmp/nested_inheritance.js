function foo(){
	for(var cls in this.__inherit__){
		if(!this.__inherit__.hasOwnProperty(cls)){ continue; }

		this[cls] = new (this.__inherit__[cls])(this);
	}
}

var clsA;
// bound like this so that they're immutable
Object.defineProperties(foo.prototype, {
	__inherit__ : { value : {
		bar : clsA = function(parent){ Object.defineProperty(this, '__parent__', { value : parent }); }
	} }
});

clsA.prototype = {
	foobar : function(){
		return this.__parent__;
	}
};

var fooInst = new foo();
console.log(fooInst.bar.foobar() == fooInst);