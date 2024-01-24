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
const PORT = process.env.PORT || 8000;
(async () => {
  await connectMongo()
  http.listen(PORT);
})();

io.on("connection", (socket) => {
  socket.on("code", ({ codeId, code, input }) => {
    socket.broadcast.emit(codeId, { codeId, code, input });
  });
  socket.on("run", ({ codeId, codeOutput }) => {
    socket.broadcast.emit(codeId + "output", { codeOutput });
  });
});
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);
app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Hello World'))
app.use("/api/auth", authRoutes);
app.use("/api/codes", codeRoutes);
