import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var bandName = "";

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({extended: true}));
app.post("/submit", (req, res) => {
  bandName = req.body["street"] + req.body["pet"];
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
  // console.log("My name is " + req.body["street"] + " and my surname is " + req.body["pet"]);
  // res.send("Form submitted successfully");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
