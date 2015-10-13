var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("jonnebot.db");

module.exports = function(bot) {
	this.add("event:join", function(msg, cb) {
		bot.say(msg.arg.channel, "Hello " + msg.arg.nick + " and welcome to " + msg.arg.channel);
		cb();
	});
	
	this.add("event:pm", function(msg, cb) {
		if (msg.arg.text == "!login") {
			db.each("SELECT * FROM users WHERE 'username' = '" + msg.arg.nick + "'", function(err, row) {
				console.log(err, row);
			});
		}
	});
	
	
	
	this.add("event:message", function(msg, cb) {
		if (msg.arg.text == "!op") {
			bot.send("mode", msg.arg.to, "+o", msg.arg.nick);
		}
		cb();
	});
}
