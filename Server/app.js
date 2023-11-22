if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routers");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
// const port = 3000;
const server = http.createServer(app);
// // const socket = require("socket.io");
// const io = socket(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

app.use(errorHandler);

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${process.env.PORT}`);
// });
module.exports = app;
