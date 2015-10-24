module.exports = function(bot) {
	this.add("event:message", function(msg, cb) {
		if (msg.arg.text.indexOf("!restart") > -1) {
			var users = require("./users.json");
			var username = msg.arg.nick;

			if (users[username] && users[username].logged == 1 && users[username].level >= 9) {
				process.exit(0);
			} else {
				bot.say(msg.arg.nick, "You have not permission for that!");
			}
		}
		cb();
	});

	this.add("event:*", function(msg, cb) {
		cb();
	});
}
