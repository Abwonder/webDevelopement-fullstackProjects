const fs = require('fs');


// fs.writeFile("message.txt", "Hello Abioye working with Node.js!", (err) => {
//     if (err) throw err;
//     console.log("File has been saved!");
// });

// // This code writes a message to a file named "message.txt" using Node.js
// // The message is "Hello Abioye working with Node.js!" and it logs a confirmation   message once the file is saved successfully.


// // let write another message to the same file
// fs.appendFile("message.txt", "\nThis is an additional message.", (err) => {
//     if (err) throw err;
//     console.log("Additional message has been appended to the file!");
// });

const fileName = "message.txt";
fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) throw err;
    console.log("File contents:");
    console.log(data);
});

