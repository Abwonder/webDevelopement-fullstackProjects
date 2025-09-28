import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// inquirer
//     .prompt([
//         {
//         type: "input",
//         name: "username",
//         message: "What is your name?",
//     },
// ])
//     .then((answers) => {
//         console.log(`Hello, ${answers.username}!`);
//     });

// this section is for the test
// inquirer
//     .prompt([
//         {
//             type: "number",
//             name: "age",
//             message: "Enter your age?",
//             validate: (value) => !isNaN(value) || "Please enter a valid number",

//         },
//     ])
//     .then((answers) => {
//         console.log(`Your age is ${answers.age}`);
//     })
//     .catch((error) => {
//         if (error.isTtyError) {
//             // Prompt couldn't be rendered in the current environment
//             console.log("Prompt couldn't be rendered in the current environment");
//         } else {
//             // Something else went wrong
//             console.log("Something else went wrong");
//         }
//     });

// inquirer
//   .prompt([
//     {
//       type: "confirm",
//       name: "confirmInstall",
//       message: "Do you want to install dependencies?",
//       default: true,
//     },
//   ])
//   .then((answers) => {
//     console.log("Confirmed:", answers.confirmInstall);
//   });

// inquirer
//   .prompt([
//     {
//       type: "list",
//       name: "language",
//       message: "Pick a language",
//       choices: ["JavaScript", "Python", "Go"],
//     },
//     {
//       type: "rawlist",
//       name: "framework",
//       message: "Pick a framework",
//       choices: ["React", "Vue", "Angular"],
//     },
//     {
//       type: "expand",
//       name: "os",
//       message: "Pick an OS",
//       choices: [
//         { key: "w", name: "Windows", value: "windows" },
//         { key: "m", name: "Mac", value: "mac" },
//         { key: "l", name: "Linux", value: "linux" },
//       ],
//     },
//   ])
//   .then(console.log);

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
      type: "input",
    },
  ])
  .then((answers) => {
    console.log(answers.URL);
    var qr_svg = qr.image(answers.URL);
    qr_svg.pipe(fs.createWriteStream("GOOGLE_QR.png"));

    fs.writeFile("google-message.txt", `1. ${answers.URL}\n`, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
