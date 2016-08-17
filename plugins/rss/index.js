var config = require("./config.json");
var fs = require("fs");
var parser = require("rss-parser");

module.exports = function(bot) {
	setTimeout(function() {
		setInterval(function() {
			config.urls.forEach(function(feed, index) {
				parser.parseURL(feed.url, function(err, parsed) {
					if (err) {
						console.log("ERROR: " + err);
					} else {
						parsed.feed.entries.forEach(function(entry) {
							if (new Date(entry.pubDate).getTime() / 1000 > config.urls[index].lastPostTime) {
								if (feed.prefix) {
									bot.say(bot.config.channel, feed.prefix + " | " + entry.title + " | " + entry.link);
								} else {
									bot.say(bot.config.channel, "RSS | " + entry.title + " | " + entry.link);
								}
								config.urls[index].lastPostTime = new Date(entry.pubDate).getTime() / 1000;
								fs.writeFile("./plugins/rss/config.json", JSON.stringify(config, null, 4), function(err) {
									console.log("ERROR: " + err);
								});
							}
						});
					}
				});
			});
		}, config.interval * 1000);
	}, 10000);
}
