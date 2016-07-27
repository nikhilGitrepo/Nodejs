/**
 * http://usejsdoc.org/
 */
var http = require('http');
var fs = require('fs');

function send404Error(response){
	response.writeHead(404,{"Content-Type":"text/plain"});
	response.write('Error 404: Page not found!');
	response.end();
}

function onRequest(req,res){
	if(req.method == 'GET' && req.url == '/' ){
		res.writeHead(200, {'Content-Type':'text/html'});
		fs.createReadStream('./index.html').pipe(res);
	}else{
		send404Error(res);
	}
}

http.createServer(onRequest).listen(8888);
console.log('Server is running on localhost:8888');