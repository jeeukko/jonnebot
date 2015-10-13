var sqlite3 = require("sqlite3");

module.exports = function(bot) {
	var db = new sqlite3.Database("jonnebot.db");
	
	this.add("event:message", function(msg, cb) {
		if (msg.arg.text.indexOf("!restart") > -1) {			
			var username = msg.arg.nick;
			
			db.all("SELECT * FROM users WHERE username = ?", username, function(err, rows) {
				if (rows[0] && rows[0].logged == 1 && rows[0].level >= 9) {
					process.exit(1);
				} else {
					bot.say(msg.arg.nick, "You have not permission for that!");
				}
			});
		}
		cb();
	});
	
	this.add("event:*", function(msg, cb) {
		cb();
	});
}
