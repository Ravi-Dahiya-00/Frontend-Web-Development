// ================================================================
// JAVASCRIPT — FILE 2: FUNCTIONS + SCOPE + HOISTING + CLOSURES
// ================================================================
// YOUR FOLDER STRUCTURE FOR THIS FILE:
//
// 2 Basics/
// ├── 1_functions.js            ← Section 1
// ├── 2_scope.js                ← Section 2
// ├── 3_hoisting.js             ← Section 3
// ├── 4_closures.js             ← Section 4
// ├── 5_callbacks_hof.js        ← Section 5
// └── index.html
//
// Since you know C++ well, functions will feel very familiar.
// The NEW things unique to JS are:
// → Arrow functions
// → Hoisting
// → Closures
// → Functions as values (passing functions around)
// ================================================================




// ================================================================
// SECTION 1 — 1_functions.js
// TOPIC: Functions — All 3 Ways to Write Them
// ================================================================

/*
  WHAT IS A FUNCTION?
  ===================
  A reusable block of code that performs a specific task.
  Same concept as C++ functions — just different syntax.

  C++:
  int add(int a, int b) { return a + b; }

  JS has 3 ways to write functions:
  1. Function Declaration
  2. Function Expression
  3. Arrow Function  ← New in ES6, most used in modern JS

  All 3 do the same job. The differences are in:
  → Syntax
  → Hoisting behaviour (explained in Section 3)
  → How 'this' keyword works (explained in File 3 - OOP)
*/


// ================================================================
// WAY 1: FUNCTION DECLARATION
// ================================================================

/*
  The classic way. Same structure as C++.
  Syntax: function name(parameters) { body }
*/

function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Ravi"));    // Hello, Ravi!
console.log(greet("Raj"));     // Hello, Raj!

// Function with multiple parameters:
function add(a, b) {
    return a + b;
}
console.log(add(5, 3));   // 8
console.log(add(10, 20)); // 30

// Function with no parameters:
function getCurrentYear() {
    return new Date().getFullYear();
}
console.log(getCurrentYear());  // 2024 (or whatever current year)

// Function with no return value (returns undefined automatically):
function printMessage(msg) {
    console.log(`Message: ${msg}`);
    // no return → returns undefined
}
printMessage("Hello");


// ================================================================
// DEFAULT PARAMETERS
// ================================================================

/*
  You can set a default value for a parameter.
  If the caller doesn't pass that argument, the default is used.
  C++ also has this feature (since C++11).
*/

function greetUser(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

console.log(greetUser("Ravi", "Hi"));  // Hi, Ravi!
console.log(greetUser("Ravi"));         // Hello, Ravi!   ← greeting uses default
console.log(greetUser());               // Hello, Guest!  ← both use default

// Default can be any expression:
function createOrder(item, qty = 1, price = 99) {
    return `${qty}x ${item} = ₹${qty * price}`;
}
console.log(createOrder("Pizza"));          // 1x Pizza = ₹99
console.log(createOrder("Pizza", 3));       // 3x Pizza = ₹297
console.log(createOrder("Pizza", 2, 150)); // 2x Pizza = ₹300


// ================================================================
// REST PARAMETERS ( ...args )
// ================================================================

/*
  Rest parameters let a function accept ANY NUMBER of arguments.
  They are collected into an ARRAY inside the function.

  Similar to variadic functions in C++ but much simpler.
  Syntax: ...parameterName  (three dots before the name)

  Rules:
  → Must be the LAST parameter
  → Only ONE rest parameter per function
*/

function sum(...numbers) {
    // numbers is a regular array: [1, 2, 3, 4, 5]
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}

console.log(sum(1, 2, 3));          // 6
console.log(sum(1, 2, 3, 4, 5));   // 15
console.log(sum(10, 20));           // 30

// Mix of fixed and rest:
function introduce(firstName, lastName, ...hobbies) {
    return `${firstName} ${lastName} likes: ${hobbies.join(", ")}`;
}
console.log(introduce("Ravi", "Yadav", "coding", "cricket", "music"));
// Ravi Yadav likes: coding, cricket, music


// ================================================================
// SPREAD OPERATOR ( ...array )
// ================================================================

/*
  Same 3-dot syntax as rest, but used OUTSIDE a function.
  → Rest    → collects multiple values INTO an array (in parameters)
  → Spread  → expands an array OUT into individual values (in calls)

  Same symbol (...), completely opposite purpose.
  Context tells you which one it is.
*/

const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];

// Spread to expand array into function arguments:
console.log(Math.max(...nums1));        // 3  (same as Math.max(1, 2, 3))
console.log(sum(...nums1));             // 6  (spreads array as arguments)

// Spread to combine arrays:
const combined = [...nums1, ...nums2];
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Spread to copy an array (new array, not a reference):
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original);  // [1, 2, 3]  ← not changed
console.log(copy);      // [1, 2, 3, 4]

// Spread to add elements:
const withExtra = [0, ...original, 4, 5];
console.log(withExtra);  // [0, 1, 2, 3, 4, 5]

/*
  INTERVIEW TIP:
  "What is the difference between rest and spread?"
  Rest  → in function PARAMETERS → collects arguments INTO an array
  Spread→ in function CALLS or array literals → expands array OUT
  Both use ... but in different contexts.
*/


// ================================================================
// WAY 2: FUNCTION EXPRESSION
// ================================================================

/*
  A function stored in a VARIABLE.
  The function itself has no name — it's "anonymous".

  Syntax: const varName = function(params) { body }

  KEY DIFFERENCE from Declaration:
  → Function declarations are HOISTED (available before their line)
  → Function expressions are NOT hoisted (only available after their line)
  → Covered in detail in Section 3 (Hoisting)
*/

const multiply = function(a, b) {
    return a * b;
};

console.log(multiply(4, 5));   // 20
console.log(multiply(3, 7));   // 21

// You can also name function expressions (named function expression):
const divide = function divideNumbers(a, b) {
    if (b === 0) return "Cannot divide by zero";
    return a / b;
};
console.log(divide(10, 2));   // 5
console.log(divide(10, 0));   // Cannot divide by zero
// Note: divideNumbers is only available INSIDE the function itself
// (used for recursion) — not outside it


// ===============================================================
// WAY 3: ARROW FUNCTION ( => )
// =================================================================

/*
  Introduced in ES6 (2015).
  The MOST USED function syntax in modern JavaScript.
  Shorter syntax for writing functions.

  Syntax: const name = (params) => { body }

  SHORTHAND RULES:
  1. If only ONE parameter → can remove the parentheses
  2. If body is ONE expression → can remove { } and return keyword
     (called "implicit return")
  3. If NO parameters → must keep empty ()
*/

// Full arrow function (with body):
const subtract = (a, b) => {
    return a - b;
};
console.log(subtract(10, 3));  // 7

// Implicit return — ONE expression body, no { } needed:
const square = (n) => n * n;          // return n*n — implied
console.log(square(5));    // 25

// One parameter — no parentheses needed:
const double = n => n * 2;
console.log(double(7));    // 14

// No parameters — empty () required:
const sayHi = () => "Hi there!";
console.log(sayHi());    // Hi there!

// Returning an object — wrap in () to avoid confusion with { }:
const makeUser = (name, age) => ({ name: name, age: age });
console.log(makeUser("Ravi", 21));   // { name: 'Ravi', age: 21 }

// Multi-line body — needs { } and explicit return:
const getMax = (a, b) => {
    if (a > b) return a;
    return b;
};
console.log(getMax(10, 20));   // 20


// ================================================================
// COMPARISON: ALL 3 WAYS SIDE BY SIDE
// ================================================================

// Declaration:
function addDec(a, b) { return a + b; }

// Expression:
const addExp = function(a, b) { return a + b; };

// Arrow:
const addArr = (a, b) => a + b;

console.log(addDec(2, 3));  // 5
console.log(addExp(2, 3));  // 5
console.log(addArr(2, 3));  // 5

/*
  All 3 give the same result here.
  The real differences:
  1. Hoisting    → declaration is hoisted, expression/arrow are not
  2. 'this'      → arrow does NOT have its own 'this' (File 3)
  3. arguments   → arrow does NOT have 'arguments' object
  4. Syntax      → arrow is shortest (why it's most popular)

  WHICH TO USE:
  → Arrow functions  → most of the time (modern JS standard)
  → Declarations     → when you need hoisting or named recursion
  → Expressions      → similar to arrow, less common now
*/


