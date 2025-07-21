const http = require('http');
const { MongoClient } = require('mongodb');

const port = 3006;
const url = 'mongodb://mongodb:27017/native-node-test';
let isConnected = "no";

const API_KEY = 'secret123';
const MAX_SIZE = 1e6; // 1MB
let size = 0;
let chunks = [];

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

	res.setHeader('Access-Control-Allow-Origin', '*');

	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-DNS-Prefetch-Control', 'off');
	res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
	res.setHeader('X-Download-Options', 'noopen');
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-Frame-Options', 'SAMEORIGIN');
	res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
	res.setHeader('Referrer-Policy', 'no-referrer');
	res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
	res.setHeader('Content-Security-Policy', "default-src 'self'");


	if (req.method === 'OPTIONS') {
		res.writeHead(204, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		});
		return res.end();
	}

	const headers = req.headers;
	if (headers['authorization'] !== `Bearer ${API_KEY}`) {
		res.writeHead(401);
		return res.end('Accès non autorisé');
	}

	const ip = req.socket.remoteAddress;
	console.log(`[${new Date().toISOString()}] ${ip} ${req.method} ${req.url}`);


	if (req.method === 'GET' && req.url === '/') {

		req.on('data', (chunk) => {
			size += chunk.length;
			if (size > MAX_SIZE) {
				res.writeHead(413, { 'Content-Type': 'text/plain' });
				res.end('Payload trop volumineux');
				req.pause();
				req.socket.destroy();
			} else {
				chunks.push(chunk);
			}
		});


		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(isConnected);
	} else if (req.method === 'POST' && req.url === '/buffer') {

		let chunks = [];

		req.on('data', (chunk) => {
			size += chunk.length;
			if (size > MAX_SIZE) {
				res.writeHead(413, { 'Content-Type': 'text/plain' });
				res.end('Payload trop volumineux');
				req.pause();
				req.socket.destroy();
			} else {
				chunks.push(chunk);
			}
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