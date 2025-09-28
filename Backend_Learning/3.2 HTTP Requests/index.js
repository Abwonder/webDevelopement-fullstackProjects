import express from "express";
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
    console.log(req.rawHeaders);
});

app.get("/about", (req, res) => {
    res.send("<h1>Hello</h1><p>My name is Abioye and I am a cybersecurity professional.<br> Now, a training towards becoming a FullStack Developer!!!</p>");
    console.log(req.rawHeaders);
});

app.get("/contactme", (req, res) => {
    res.send("<h1>Contact Me</h1><p>Phone Number: +2347063943540");
    console.log(req.rawHeaders);
});

app.listen(PORT, () =>{
    console.log("Server is running on " + PORT + ", so we are live!!")
});
