var http = require("http");
var fs = require('fs');
var server = http.createServer(function(request, response) {
	var index = fs.createReadStream("index.html");
	index.pipe(response);
});
server.listen(3000);

var io = require("socket.io").listen(server);
// émission et réception sous /messages
io.of("/messages")
.on("connection", function (socket) {
	socket.on("message", function(data) {
		console.log("Réception du message : " + data);
		console.log("provenant des utilisateurs connectés sous /messages");
	});
});
// émission et réception sous /infos
io.of("/infos")
.on("connection", function (socket) {
	console.log("Connexion sous /infos");
	socket.emit("info", "Bienvenue dans la partie infos du serveur");
}); 

