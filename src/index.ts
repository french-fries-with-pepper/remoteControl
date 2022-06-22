console.log("Starting!!!");
import http from "http";
import WebSocket, { WebSocketServer, createWebSocketStream } from "ws";

import { parseCommand } from "./utils/commandParser";
import * as mouseController from "./mouseController";
import * as drawController from "./drawController";
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
      const [command, ...args] = parseCommand(message.toString());
      let clientResponseMsg: string;
      switch (command) {
        case "mouse_up":
          clientResponseMsg = mouseController.mouse_up(args[0]);
          break;
        case "mouse_down":
          clientResponseMsg = mouseController.mouse_down(args[0]);
          break;
        case "mouse_left":
          clientResponseMsg = mouseController.mouse_left(args[0]);
          break;
        case "mouse_right":
          clientResponseMsg = mouseController.mouse_right(args[0]);
          break;
        case "mouse_position":
          clientResponseMsg = mouseController.mouse_position();
          break;
        case "draw_square":
          clientResponseMsg = drawController.draw_square(args[0]);
          break;
        case "draw_rectangle":
          clientResponseMsg = drawController.draw_rectangle(args[1], args[0]);
          break;
        case "draw_circle":
          clientResponseMsg = drawController.draw_circle(args[0]);
          break;
        default:
          clientResponseMsg = "Unknown command";
      }

      client.send(clientResponseMsg, { binary: false });
    }
  });
  connection.on("close", () => {
    console.log(`Disconnected ${ip}`);
  });
});
