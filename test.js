var sqlite3 = require("sqlite3");
var crypto = require('crypto');
var db = new sqlite3.Database("jonnebot.db");

var username = "jeeukko";
var password = passwordhasher.createHash("sha512", "Qwerty123");

console.log(username, password);

/*db.serialize(function() {
	db.all("SELECT * FROM users WHERE username = ?", ["jeeukko"], function(err, rows) {
		if (rows[0].logged == 0) {
			
		}
	});
	
	db.close();
});*/
