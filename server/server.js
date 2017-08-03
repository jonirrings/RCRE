let http = require('http');
let responseJSON = require('./data.json');

let server = http.createServer(function(req, res) {
    res.setHeader('Access-Allow-Cross-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    res.end(JSON.stringify(responseJSON));
});

server.listen(8888);
console.log('server is listen at 0.0.0.0:8888');