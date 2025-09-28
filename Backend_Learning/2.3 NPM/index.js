// var generateName = require('sillyname');
import generateName from "sillyname";
import superheroes,{randomSuperhero} from "superheroes";

var sillyName = generateName();

console.log('My silly name is: ' + sillyName);
// console.log("Hello from Node.js! - from yours truly, Abioye Oyatoye!!");


console.log(`My superhero name is: ${superheroes[10]}`);

console.log("\nSee random superhero name below: ");
console.log(`My superhero name is: ${randomSuperhero()}`);
