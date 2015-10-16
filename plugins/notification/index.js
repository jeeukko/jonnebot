var config = require("./config.json");
var http = require("http");
var url = require("url") ;

module.exports = function(bot) {
	http.createServer(function(req, res) {
		var get = url.parse(req.url, true).query;
	
		if (get.secret && get.secret == config.secret) {
			if (get.type && config.messages[get.type]) {
				res.writeHead(200);
				res.end(JSON.stringify({
					ok: true,
					msg: config.messages[get.type]
				}));
				bot.say(bot.config.channel, config.messages[get.type]);
			} else {
				res.writeHead(404);
				res.end(JSON.stringify({
					ok: false,
					msg: "wrong type or missing"
				}));
			}
		} else {
			res.writeHead(403);
			res.end(JSON.stringify({
				ok: false,
				msg: "wrong secret key or missing"
			}));
		}
	}).listen(config.port);
}
