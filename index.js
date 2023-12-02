require("dotenv").config();
const express = require("express");
const ehbs = require("express-handlebars");
const startDB = require("./databases/connect");
const bodyParser = require("body-parser");
const router = require("./routes");
const session = require("express-session");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const User = require("./models/User");
const Chat = require("./models/Chat");
const app = express();
const server = createServer(app);
const io = new Server(server);
// connect db
startDB();

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  ehbs.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", "./views");

// router
app.use("/", router);
// Set up Socket.IO
const chatNamespace = io.of("/chat");

chatNamespace.on("connection", async (socket) => {
  console.log(
    "User connected to the chat namespace!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );
  const userId = socket.handshake.auth.token;
  if (!userId) {
    return socket.disconnect();
  }
  await User.findByIdAndUpdate({ _id: userId }, { $set: { online: true } });

  // client-send-status-online
  socket.broadcast.emit("client-send-status-online", userId);

  // client-send-id-send-receive
  socket.on("client-send-id-send-receive", async (data) => {
    const { sender, receiver } = data;
    const chats = await Chat.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .populate("sender", "fullname image")
      .populate("receiver", "fullname image");
    socket.emit("server-send-old-chat", chats);
  });

  // client-send-message
  socket.on("client-send-message", async (data) => {
    socket.broadcast.emit("server-load-new-chat", data);
  });

  // client-delete-chat
  socket.on("client-delete-chat", async (data) => {
    socket.broadcast.emit("server-delete-chat", data);
  });

  // client-edit-chat
  socket.on("client-edit-chat", async (data) => {
    socket.broadcast.emit("server-edit-chat", data);
  });

  // client-send-add-member
  socket.on("client-send-add-member", async (data) => {
    console.log(data);
    socket.broadcast.emit("server-send-add-member", data);
  });

  socket.on("disconnect", async () => {
    await User.findByIdAndUpdate({ _id: userId }, { $set: { online: false } });

    // client-send-status-offline
    socket.broadcast.emit("client-send-status-offline", userId);
    console.log("User disconnected from the chat namespace");
  });
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
