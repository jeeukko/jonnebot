var config = require("./config.json");
var mailchimp = require("mailchimp");

module.exports = function(bot) {
	var webhook = new MailChimpWebhook({
		port: config.port,
		secret: config.secret
	});

	webhook.on("subscribe", function (data, meta) {
		bot.say(bot.config.channel, "New subscriber joined to the mailing list!");
	});

	webhook.on("error", function(error) {
		console.log(error.message);
	});
}
