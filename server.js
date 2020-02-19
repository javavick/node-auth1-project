const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const server = express();

const dbConfig = require("./data/dbConfig.js");
const UsersRouter = require("./routes/usersRouter.js");

server.use(express.json());
server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "Be strong enough to be gentle",
    cookie: {
      httpOnly: true
    },
    store: new KnexSessionStore({
      knex: dbConfig,
      createtable: true
    })
  })
);
server.use("/api", UsersRouter);

module.exports = server;
