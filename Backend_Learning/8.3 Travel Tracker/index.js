import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "abioye",
  port: 5432,
});

db.connect();

let visited_countries = [];
db.query("SELECT country_code FROM visited_countries", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    visited_countries = res.rows;
  }
  db.end();
});

app.get("/", async (req, res) => {
  const visited = [];
  visited_countries.forEach((element) => { visited.push(element.country_code); });
  console.log(typeof (visited));
  console.log(visited);
  res.render("index.ejs", {
    total: visited.length,
    countries: visited
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
