console.log("Starting!!!");
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
const server = http.createServer((req, res) => {
    res.writeHead(200);
});
server.listen(8000, () => {
    console.log('Listen port 8000');
});
const ws = new WebSocketServer({ server });
ws.on('connection', (connection, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`Connected ${ip}`);
    connection.on('message', (message) => {
        console.log('Received: ' + message);
        for (const client of ws.clients) {
            if (client.readyState !== WebSocket.OPEN)
                continue;
            if (client === connection)
                continue;
            client.send(message, { binary: false });
        }
    });
    connection.on('close', () => {
        console.log(`Disconnected ${ip}`);
    });
});
