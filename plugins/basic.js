module.exports = function(bot) {
	this.add("event:*", function(msg, cb) {
		cb();
	});
}
