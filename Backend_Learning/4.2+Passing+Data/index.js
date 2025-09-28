import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  // console.log(req.body.fName);
  const nameLength = req.body.fName.trim().length + req.body.lName.trim().length;
  // console.log(`Received name: ${name}`);
  res.render("index.ejs", { nameLength: nameLength });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
