var http = require("http"),

fs = require("fs");

http.createServer(function (request, response) {
	console.log('inside');
	
	request.on("end", function () {
	console.log('inside end');	
		fs.readFile("test.txt", 'utf-8', function (error, data) {
			
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		console.log('before data manipulation');
		data = parseInt(data) + 1;
		fs.writeFile('test.txt', data);
		response.end('This page was refreshed ' + data + ' times!');

		});
	});
}).listen(8989);