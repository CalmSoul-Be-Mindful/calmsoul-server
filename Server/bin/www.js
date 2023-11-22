if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const server = require("../app");
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
