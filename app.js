const http = require("http");
const express = require("express");
const api_router = require("./api/router");

const app = express();
const server = http.createServer(app);

// add routers
app.use("/api", api_router);

const port = Number.parseInt(process.env.APP_PORT);
server.listen(port, (err) => {
  if (err != null) throw `failed to start server, ${err}`;

  console.log("server running on ");
});
