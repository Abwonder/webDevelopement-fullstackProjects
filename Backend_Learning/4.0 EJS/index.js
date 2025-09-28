import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    // const today = new Date("April 25, 1991 23:15:30 GMT");
    const today = new Date();
    let day = today.getDay();

    let type = "a weekday";
    let adv = "It's a good day to work hard";

    console.log(day);
    if (day === 6 || day === 0) {
      type = "it's the weekend";
      adv = "It's time to relax and have fun!";
    }

    res.render("index.ejs", { 
      dayType:type, 
      advice: adv
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
