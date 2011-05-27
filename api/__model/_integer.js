module.exports = function(num){
	this.num = 0|num;
}

module.exports.prototype = {
	valueOf : function(){ return this.num; }
};