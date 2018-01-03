var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://pearlygate-i.alooma-dev.com/exercise' });
});

console.log("listening on port 8000")
server.listen(8000);

//
// Create your target server
//
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
//   res.end();
// }).listen(9000);
