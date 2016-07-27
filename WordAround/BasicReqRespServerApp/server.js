var http = require("http");

var fs = require('fs');

var str = '';

/*fs.readFile('../BasicReqRespServerApp/my.json','utf8', function(err,data){
	
fs.readFile('/etc/hosts','utf8', function(err,data){
	
	str = data;
	if(data == null ){
		str = err;
	}
});
*/

/*
http.request({hostname:'https://www.quandl.com/api/v3/datasets/EOD/AAPL.csv?api_key=Bh4J_JDBww_32xzrEedp&start_date=2011-01-01'}, function(res){
	res.setEncoding('utf8');
	res.on('data', function(chunk){
		str= chunk;
		console.log(str);
	});
	
}).end();
*/



http.createServer(function(request, response) {
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write(str);
	response.end();
}).listen(8888);	