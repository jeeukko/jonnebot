var config = require("./config.json");

module.exports = function(bot) {
	this.add("irc:message", function(msg, cb) {
		if (config.commands[msg.args.text]) {
			bot.say(bot.config.channel, config.commands[msg.args.text]);
		}
		cb();
	});
}
