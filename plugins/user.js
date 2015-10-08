module.exports = function(bot) {
	this.add("event:join", function(msg, cb) {
		bot.say(msg.arg.channel, "Hello " + msg.arg.nick + " and welcome to " + msg.arg.channel);
		cb();
	});
}
