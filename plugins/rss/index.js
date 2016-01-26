var config = require("./config.json");
var fs = require("fs");
var parser = require("rss-parser");

module.exports = function(bot) {
	setTimeout(function() {
		setInterval(function() {
			parser.parseURL(config.url, function(err, parsed) {
				if (err) {
					console.log("ERROR: " + err);
				} else {
					parsed.feed.entries.forEach(function(entry) {
						if (new Date(entry.pubDate).getTime() / 1000 > config.lastPostTime) {
							bot.say(bot.config.channel, "New message: " + entry.title + " | " + entry.link);

							config.lastPostTime = new Date(entry.pubDate).getTime() / 1000;
							fs.writeFile("./plugins/rss/config.json", JSON.stringify(config, null, 4), function(err) {
								console.log("ERROR: " + err);
							});
						}
					});
				}
			});
		}, config.interval * 1000);
	}, 10000);
}
