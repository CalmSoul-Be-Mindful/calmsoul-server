if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const http = require("http");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routers");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);

// const port = 3000;

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log("triggered");
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

app.use(errorHandler);

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${process.env.PORT}`);
// });
module.exports = server;
