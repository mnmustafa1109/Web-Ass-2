// Basic JavaScript Cheatsheet

// VARIABLES
const variableName = 'Hello, World';
let mutableVariable = 42;

// DATA TYPES
const number = 42;
const string = 'Hello';
const boolean = true;
const array = [1, 2, 3];
const object = { key: 'value' };

// OPERATORS
const sum = 3 + 4;
const difference = 7 - 2;
const product = 5 * 6;
const quotient = 12 / 3;
const modulus = 10 % 3;

const isEqual = 5 === 5;
const isNotEqual = 3 !== '3';

const andOperator = true && false;
const orOperator = true || false;
const notOperator = !true;

// CONDITIONALS
if (condition) {
  // Code to execute if condition is true
} else if (anotherCondition) {
  // Code to execute if anotherCondition is true
} else {
  // Code to execute if none of the conditions are true
}

// LOOPS
for (let i = 0; i < 5; i++) {
  // Code to repeat 5 times
}

while (condition) {
  // Code to repeat as long as the condition is true
}

// FUNCTIONS
function sayHello(name) {
  console.log(`Hello, ${name}`);
}
sayHello('Alice');

// ARROW FUNCTIONS
const add = (a, b) => a + b;

// ARRAYS
const fruits = ['apple', 'banana', 'cherry'];
fruits.push('date'); // Add to the end
fruits.pop(); // Remove from the end
fruits.shift(); // Remove from the beginning
fruits.unshift('apricot'); // Add to the beginning

// OBJECTS
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
};

// CLASSES (ES6)
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log('Animal sound');
  }
}

class Dog extends Animal {
  speak() {
    console.log('Woof!');
  }
}

// PROMISES
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Asynchronous operation
    if (success) {
      resolve(result);
    } else {
      reject(error);
    }
  });
};

fetchData()
  .then(data => {
    // Handle success
  })
  .catch(error => {
    // Handle error
  });

// ASYNC/AWAIT
const fetchDataAsync = async () => {
  try {
    const data = await fetchData();
    // Handle data
  } catch (error) {
    // Handle error
  }
};

// MODULES (ES6)
// Separate file/module.js
export const myVariable = 42;
export function myFunction() {
  // Function code
}

// In another file
import { myVariable, myFunction } from './module';

// BROWSER APIs
// DOM manipulation, XMLHttpRequest, Fetch API, etc.

// MODERN JAVASCRIPT (ES6+)
// Destructuring, Template Literals, Spread/Rest operators, Classes, Promises, async/await, Arrow functions, Modules, etc.

// Example Array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// FILTER
// Filter creates a new array with elements that pass a test (provided as a function).
const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// MAP
// Map applies a function to each element of the array and creates a new array with the results.
const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// REDUCE
// Reduce applies a function to an accumulator and each element in the array to reduce it to a single value.
const sum1 = numbers.reduce((accumulator, number) => accumulator + number, 0);
console.log(sum1); // 55

// FIND
// Find returns the first element in the array that satisfies a provided testing function.
const firstEven = numbers.find(number => number % 2 === 0);
console.log(firstEven); // 2

// EVERY
// Every tests if all elements in the array pass a provided function.
const allEven = numbers.every(number => number % 2 === 0);
console.log(allEven); // false

// SOME
// Some tests if at least one element in the array passes a provided function.
const hasEven = numbers.some(number => number % 2 === 0);
console.log(hasEven); // true

// SORT
// Sort sorts the elements of an array in place and returns the sorted array.
const unsortedNumbers = [4, 2, 8, 6, 1, 9, 5];
const sortedNumbers = unsortedNumbers.sort((a, b) => a - b);
console.log(sortedNumbers); // [1, 2, 4, 5, 6, 8, 9]

// FOREACH
// ForEach iterates through the array and applies a function to each element.
numbers.forEach(number => {
  console.log(`Number: ${number}`);
});

// INCLUDES
// Includes checks if an array includes a certain element.
const includesFive = numbers.includes(5);
console.log(includesFive); // true

// INDEXOF
// IndexOf returns the first index at which a given element can be found in the array, or -1 if it is not present.
const indexOfFive = numbers.indexOf(5);
console.log(indexOfFive); // 4
