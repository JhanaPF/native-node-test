const http = require('http');
const { MongoClient } = require('mongodb');

const port = 3006;
const url = 'mongodb://mongodb:27017/native-node-test';
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
	} else if (req.method === 'POST' && req.url === '/buffer') {

		let chunks = [];

		req.on('data', (chunk) => {
			chunks.push(chunk);
		});

		req.on('end', () => {
			const buffer = Buffer.concat(chunks);
			console.log('Données binaires reçues :', buffer);

			const text = buffer.toString('utf-8');

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ length: buffer.length, content: text }));
		});

	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});