const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs"); //this is for rendering the web page other view engines are Handlebars, moustache
app.use(express.static("public")); //middleware to serve static files


app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`); // redirects the landing page to a URL containing RoomID created through uuid
});

app.get("/:room", (req, res) => {
  res.render("room", { roomID: req.params.room });
});

server.listen(3030);
