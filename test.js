var config = require("./config.json");
var seneca = require("seneca")();

var bot = {
	say: function(cha, msg) {
		console.log(msg);
	}
};

config.plugins.forEach(function(item) {
	seneca.use(require("./plugins/" + item + ".js"), bot);
});

seneca.act({event: "join", arg: {channel: "#JHtesti", nick: "jeeukko"}});
