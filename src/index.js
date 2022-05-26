const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: [process.env.CLIENT_URL],
  },
});

const { authRoutes, codeRoutes } = require("./api/routes");
const connectMongo = require("./config");
const PORT = process.env.PORT || 5000;

connectMongo(() => {
  app.listen(PORT, () => {});
});
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  socket.on("send_share", (share, id) => {
    socket.join(id);
    console.log("Id", id);
    console.log("Share recieved ", share);
    socket.broadcast.emit("send_share", share);
    console.log("Share send", share);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/codes", codeRoutes);
