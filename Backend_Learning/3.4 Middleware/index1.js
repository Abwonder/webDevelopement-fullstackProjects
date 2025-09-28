import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 4000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  // console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({extended: true}));
app.post("/submit", (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

