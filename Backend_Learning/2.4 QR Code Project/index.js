/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// 1.Import the necessary packages
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message: "Please enter the URL you want to convert to a QR code:",
        name: "url",
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    // grab the URL from the answers object
    const url = answers.url;
    console.log("You entered: " + url);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      console.log("Something else went wrong");
    }
  });
