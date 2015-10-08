var config = require("./config.json");
var seneca = require("seneca")();
var irc = require("irc");

var bot = new irc.Client(config.server, config.botname, {
	channels: config.channels,
	userName: config.username,
	realName: config.realname,
	debug: true
});

bot.addListener("error", function(message) {
	console.log(message);
});

var botti = {
	say: function(channel, msg) {
		bot.say(channel, msg);
	}
}

config.plugins.forEach(function(item) {
	seneca.use(require("./plugins/" + item + ".js"), botti);
});

seneca.ready(function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
		
	bot.addListener("join", function(channel, nick, message) {
		seneca.act({event: "join", arg: {channel: channel, nick: nick}});
	});
});
