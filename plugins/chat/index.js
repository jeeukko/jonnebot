module.exports = function(bot) {
	this.add("irc:join", function(msg, cb) {
		if (msg.args.nick != bot.nick) {
			bot.say(bot.config.channel, "Moikka " + msg.args.nick + "! Tervetuloa " + bot.config.channel + " -kanavalle!");
		}
		cb();
	});
}
