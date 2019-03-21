require("dotenv").config();
const server = require("./server");

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`<h1>Node Blog by Ira Sanchez running on port ${port}</h1>`);
});
