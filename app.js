const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api_router = require("./api/router");
const config = require("./config");
const sequelizeMigration = require("./lib/sequelizeMigration");

const app = express();
const server = http.createServer(app);

// for logging requests
app.use(morgan("dev"));

// for allow cors policy
app.use(cors());

// add routers
app.use("/api", api_router);

(async () => {
  console.log("migrating database ...");
  const mysqlUrl = `mysql://${config.db.username}:${config.db.password}@${config.db.host}:3306/${config.db.database}`;
  await sequelizeMigration(mysqlUrl);

  const port = Number.parseInt(process.env.APP_PORT);
  server.listen(port, (err) => {
    if (err != null) throw `failed to start server, ${err}`;

    console.log("server running on", port);
  });
})();
