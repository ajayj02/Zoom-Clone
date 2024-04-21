const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.set("view engine", "ejs"); //this is for rendering the web page other view engines are Handlebars, moustache
app.use(express.static("public")); //middleware to serve static files

app.use("/peerjs", peerServer);
app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`); // redirects the landing page to a URL containing RoomID created through uuid
});

app.get("/:room", (req, res) => {
  res.render("room", { roomID: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    socket.broadcast.emit("user-connected");
  });
});

server.listen(3000);
