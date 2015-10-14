var config = require("./config.json");
var snoocore = require("snoocore");
var uri = require("urijs");

module.exports = function(bot) {
	var reddit = new snoocore({
		userAgent: config.useragent,
		oauth: {
			type: "script",
			key: config.key,
			secret: config.secret,
			username: config.username,
			password: config.password,
			scope: ["submit"]
		}
	});

	this.add("event:message", function(msg, cb) {
		uri.withinString(msg.arg.text, function(url) {
			if (url) {
				reddit("/api/submit").post({
					api_type: "json",
					sr: config.subreddit,
					title: url,
					url: url,
					kind: "link",
					resubmit: false
				});
			}
			return URI(url).normalize().toString();
		});
		cb();
	});
};
