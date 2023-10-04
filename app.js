const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const body_parser = require("body-parser");

const api_router = require("./api/router");
const config = require("./config");
const sequelizeMigration = require("./lib/sequelizeMigration");

const app = express();
const server = http.createServer(app);

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

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
