const express = require("express");
const postRouter = require("./routes/post-router");
const userRouter = require("./routes/user-router");

const server = express();

server.use(express.json());

function titleCase(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    req.body.name = req.body.name
      .toLowerCase()
      .split(" ")
      .map(function(word) {
        firstLetter = word[0];
        return word.replace(firstLetter, firstLetter.toUpperCase());
      })
      .join(" ");
  }
  next();
}

server.use(titleCase);

server.use("/api/posts", postRouter);
server.use("/api/users", titleCase, userRouter);

server.get("/", (req, res) => {
  res.send(`
  <h2>Node Blog</h2>
  `);
});

module.exports = server;
