var crypto = require("crypto");
var fs = require("fs");

module.exports = function(bot) {
	this.add("event:join", function(msg, cb) {
		if (msg.arg.nick != bot.nick) {
			bot.say(msg.arg.channel, "Hello " + msg.arg.nick + " and welcome to " + msg.arg.channel);
		}
		cb();
	});

	this.add("event:pm", function(msg, cb) {
		if (msg.arg.text.indexOf("!login") > -1) {
			var users = JSON.parse(fs.readFileSync("users.json"));
			var username = msg.arg.nick;
			var password = crypto.createHash("sha512").update(msg.arg.text.split(" ")[1]).digest("hex");

			if (users[username] && users[username].password == password) {
				if (users[username].logged == 0) {
					users[username].logged = 1;
					fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));

					if (users[username].level >= 8) {
						bot.send("mode", bot.config.channel, "+o", msg.arg.nick);
					}

					bot.say(msg.arg.nick, "You have logged in!");
				} else {
					bot.say(msg.arg.nick, "You have already logged in!");
				}
			} else {
				bot.say(msg.arg.nick, "Wrong username or password!");
			}
		} else if (msg.arg.text.indexOf("!logout") > -1) {
			var users = JSON.parse(fs.readFileSync("users.json"));
			var username = msg.arg.nick;

			if (users[username] && users[username].logged == 1) {
				users[username].logged = 0;
				fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));

				if (users[username].level >= 8) {
					bot.send("mode", bot.config.channel, "-o", msg.arg.nick);
				}

				bot.say(msg.arg.nick, "You have logged out!");
			} else {
				bot.say(msg.arg.nick, "You haven't logged in!");
			}
		}
		cb();
	});

	this.add("event:part", function(msg, cb) {
		var users = JSON.parse(fs.readFileSync("users.json"));
		var username = msg.arg.nick;

		if (users[username] && users[username].logged == 1) {
			users[username].logged = 0;
			fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));
		}

		cb();
	});

	this.add("event:quit", function(msg, cb) {
		var users = JSON.parse(fs.readFileSync("users.json"));
		var username = msg.arg.nick;

		if (users[username] && users[username].logged == 1) {
			users[username].logged = 0;
			fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));
		}

		cb();
	});
}
