var config = require("./config.json");
var seneca = require("seneca")();
var irc = require("irc");

var client = new irc.Client(config.server, config.botname, {
	channels: [config.channel],
	userName: config.username,
	realName: config.realname,
	debug: config.debug
});

var bot = {
	nick: client.opt.nick,

	config: config,

	send: function() {
		client.send.apply(client, Array.prototype.slice.call(arguments, 0));
	},
	say: function(target, msg) {
		client.say(target, msg);
	},
	action: function(target, msg) {
		client.action(target, msg);
	}
}

seneca.add("irc:*", function(msg, cb) {
	cb();
});

config.plugins.forEach(function(item) {
	seneca.use(require("./plugins/" + item + "/index.js"), bot);
});

seneca.ready(function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	client.addListener("error", function(message) {
		console.log(message);
	});
	client.addListener("names", function(channel, nicks) {
		seneca.act({irc: "names", args: {channel: channel, nicks: nicks}});
	});
	client.addListener("join", function(channel, nick) {
		seneca.act({irc: "join", args: {channel: channel, nick: nick}});
	});
	client.addListener("part", function(channel, nick, reason) {
		seneca.act({irc: "part", args: {channel: channel, nick: nick, reason: reason}});
	});
	client.addListener("quit", function(nick, reason, channels) {
		seneca.act({irc: "quit", args: {nick: nick, reason: reason, channels: channels}});
	});
	client.addListener("kick", function(channel, nick, by, reason) {
		seneca.act({irc: "kick", args: {channel: channel, nick: nick, by: by, reason: reason}});
	});
	client.addListener("message", function(nick, to, text) {
		seneca.act({irc: "message", args: {nick: nick, to: to, text: text}});
	});
	client.addListener("pm", function(nick, text) {
		seneca.act({irc: "pm", args: {nick: nick, text: text}});
	});
	client.addListener("nick", function(oldnick, newnick, channels) {
		seneca.act({irc: "nick", args: {oldnick: oldnick, newnick: newnick, channels: channels}});
	});
	client.addListener("+mode", function(channel, by, mode, argument) {
		seneca.act({irc: "+mode", args: {channel: channel, by: by, mode: mode, argument: argument}});
	});
	client.addListener("-mode", function(channel, by, mode, argument) {
		seneca.act({irc: "-mode", args: {channel: channel, by: by, mode: mode, argument: argument}});
	});
	client.addListener("action", function(from, to, text) {
		seneca.act({irc: "action", args: {from: from, to: to, text: text}});
	});
});
