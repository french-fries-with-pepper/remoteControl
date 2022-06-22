console.log("Starting!!!");
import http from "http";
import robot from "robotjs";
import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer((req, res) => {
  res.writeHead(200);
});

const port = 8080;

server.listen(port, () => {
  console.log(`Listen port ${port}`);
});

const ws = new WebSocketServer({ server });

ws.on("connection", (connection, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`Connected ${ip}`);
  connection.on("message", (message) => {
    console.log("Received: " + message);
    for (const client of ws.clients) {
      if (client.readyState !== WebSocket.OPEN) continue;
      //if (client === connection) continue;
      if (message.toString().trim() === "mouse_position") {
        const mouse = robot.getMousePos();
        client.send(`${message} ${mouse.x},${mouse.y}\0`, { binary: false });
        continue;
      }
      client.send(message, { binary: false });
    }
  });
  connection.on("close", () => {
    console.log(`Disconnected ${ip}`);
  });
});
