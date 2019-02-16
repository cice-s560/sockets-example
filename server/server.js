const ws = require("ws");
const wsServer = new ws.Server({ port: 3002 });

wsServer.broadcast = function broadcast(data) {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

wsServer.on("connection", socket => {
  console.log("Nuevo cliente!");

  socket.on("message", data => {
    const msg = JSON.parse(data);
    console.log("Nuevo mensaje --->", msg);

    switch (msg.type) {
      case "SALUDO":
        return wsServer.broadcast(`Un cliente ha saludado ${Date.now()}`);
      case "MSG":
        return wsServer.broadcast(`Alguien dice ${msg.payload}`);
      default:
        return console.log("NO EVENT MATCHING");
    }
  });
});
