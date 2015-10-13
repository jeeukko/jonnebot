var sqlite3 = require("sqlite3");
var crypto = require("crypto");

module.exports = function(bot) {
	this.add("event:join", function(msg, cb) {
		if (msg.arg.nick != bot.nick) {
			bot.say(msg.arg.channel, "Hello " + msg.arg.nick + " and welcome to " + msg.arg.channel);
		}
		cb();
	});
	
	this.add("event:pm", function(msg, cb) {
		var db = new sqlite3.Database("jonnebot.db");
		
		if (msg.arg.text.indexOf("!login") > -1) {			
			var username = msg.arg.nick;
			var password = crypto.createHash("sha512").update(msg.arg.text.split(" ")[1]).digest("hex");
			
			db.all("SELECT * FROM users WHERE username = ? AND password = ?", username, password, function(err, rows) {
				if (rows[0] && rows[0].logged == 0) {
					db.run("UPDATE users SET logged = 1 WHERE username = ?", username);
					bot.say(msg.arg.nick, "You have logged in!");
					
					if (rows[0].level >= 9) {
						bot.send("mode", msg.arg.to, "+o", msg.arg.nick);
					}
				} else {
					bot.say(msg.arg.nick, "You have already logged in!");
				}
			});
		} else if (msg.arg.text.indexOf("!logout") > -1) {
			var username = msg.arg.nick;
			
			db.all("SELECT * FROM users WHERE username = ?", username, function(err, rows) {
				if (rows[0] && rows[0].logged == 1) {
					db.run("UPDATE users SET logged = 0 WHERE username = ?", username);
					bot.say(msg.arg.nick, "You have logged out!");
				} else {
					bot.say(msg.arg.nick, "You have not logged in!");
				}
			});
		} else {
			bot.say(msg.arg.nick, "I don't understand...");
		}
		
		db.close();
		cb();
	});
	
	this.add("event:part", function(msg, cb) {
		var db = new sqlite3.Database("jonnebot.db");
		var username = msg.arg.nick;
			
		db.all("SELECT * FROM users WHERE username = ?", username, function(err, rows) {
			if (rows[0] && rows[0].logged == 1) {
				db.run("UPDATE users SET logged = 0 WHERE username = ?", username);
			}
		});
		
		db.close();
		cb();
	});
	
	this.add("event:quit", function(msg, cb) {
		var db = new sqlite3.Database("jonnebot.db");
		var username = msg.arg.nick;
			
		db.all("SELECT * FROM users WHERE username = ?", username, function(err, rows) {
			if (rows[0] && rows[0].logged == 1) {
				db.run("UPDATE users SET logged = 0 WHERE username = ?", username);
			}
		});
		
		db.close();
		cb();
	});
}
