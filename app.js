const http = require('http');
const { MongoClient } = require('mongodb');

const port = 3006;
const url = 'mongodb://mongodb:27017/test';
let isConnected = "no";

console.log("START")

MongoClient.connect(url, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	serverSelectionTimeoutMS: 1000,
	connectTimeoutMS: 1000
   })
	.then(client => {
		console.log("Db connection success!");
		isConnected = "yes";
		client.close();
	})
	.catch(err => {
		console.error("Db connection error:", err);
	});

const server = http.createServer((req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(isConnected);
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});