var config = require("./config.json");
var seneca = require("seneca")();
var irc = require("irc");

var bot = new irc.Client(config.server, config.botname, {
	channels: config.channels,
	userName: config.username,
	realName: config.realname,
	debug: true
});

var botti = {
	send: function() {
		bot.send.apply(bot, Array.prototype.slice.call(arguments, 0));
	},
	join: function(channel) {
		bot.join(channel);
	},
	part: function(channel, msg) {
		bot.part(channel, msg, null);
	},
	say: function(target, msg) {
		bot.say(target, msg);
	},
	action: function(target, msg) {
		bot.action(target, msg);
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
	
	bot.addListener("error", function(message) {
		console.log(message);
	});	
	bot.addListener("names", function(channel, nicks) {
		seneca.act({event: "names", arg: {channel: channel, nicks: nicks}});
	});
	bot.addListener("join", function(channel, nick) {
		seneca.act({event: "join", arg: {channel: channel, nick: nick}});
	});
	bot.addListener("part", function(channel, nick, reason) {
		seneca.act({event: "part", arg: {channel: channel, nick: nick, reason: reason}});
	});
	bot.addListener("quit", function(nick, reason, channels) {
		seneca.act({event: "quit", arg: {nick: nick, reason: reason, channels: channels}});
	});
	bot.addListener("kick", function(channel, nick, by, reason) {
		seneca.act({event: "kick", arg: {channel: channel, nick: nick, by: by, reason: reason}});
	});
	bot.addListener("message", function(nick, to, text) {
		seneca.act({event: "message", arg: {nick: nick, to: to, text: text}});
	});
	bot.addListener("pm", function(nick, text) {
		seneca.act({event: "pm", arg: {nick: nick, text: text}});
	});
	bot.addListener("nick", function(oldnick, newnick, channels) {
		seneca.act({event: "nick", arg: {oldnick: oldnick, newnick: newnick, channels: channels}});
	});
	bot.addListener("+mode", function(channel, by, mode, argument) {
		seneca.act({event: "+mode", arg: {channel: channel, by: by, mode: mode, argument: argument}});
	});
	bot.addListener("-mode", function(channel, by, mode, argument) {
		seneca.act({event: "-mode", arg: {channel: channel, by: by, mode: mode, argument: argument}});
	});
	bot.addListener("action", function(from, to, text) {
		seneca.act({event: "mode+", arg: {from: from, to: to, text: text}});
	});
});
