var uri = require("urijs");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(bot) {
	this.add("irc:message", function(msg, cb) {
		uri.withinString(msg.args.text, function(url) {
			if (url) {
				request(url, function (err, res, body) {
					if (!err && res.statusCode == 200) {
						var $ = cheerio.load(body);
						bot.say(bot.config.channel, $("title").text());
					}
				});
			}
		});
		cb();
	});
};
