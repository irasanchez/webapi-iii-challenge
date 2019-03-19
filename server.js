const express = require("express");
const postRouter = require("./routes/post-router");
const userRouter = require("./routes/user-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
  <h2>Node Blog</h2>
  `);
});

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

module.exports = server;
