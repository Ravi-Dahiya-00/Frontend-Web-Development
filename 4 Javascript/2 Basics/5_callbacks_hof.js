


// ================================================================
// SECTION 5 — 5_callbacks_hof.js
// TOPIC: Callbacks + Higher Order Functions
// ================================================================

/*
  This section has TWO closely related concepts:

  1. CALLBACKS
     → A function passed as an ARGUMENT to another function
     → The receiving function CALLS it back at some point

  2. HIGHER ORDER FUNCTIONS (HOF)
     → A function that TAKES a function as argument
       OR RETURNS a function
     → Examples: map, filter, reduce (most important in JS)

  In C++, you have function pointers — this is similar but MUCH
  simpler and more powerful in JS.

  In JS, functions are "first class citizens":
  → Can be stored in variables
  → Can be passed as arguments
  → Can be returned from other functions
  → This is what makes callbacks and HOFs possible
*/


// ================================================================
// 1. CALLBACKS — Basics
// ================================================================

/*
  A callback is simply a function passed to another function.
  The other function decides WHEN to call it.
*/

// Simple callback:
function greetPerson(name, callbackFn) {
    const message = `Hello, ${name}!`;
    callbackFn(message);  // calling the passed function
}

function printToConsole(msg) {
    console.log(msg);
}

greetPerson("Ravi", printToConsole);
// → passes printToConsole as a callback
// → greetPerson calls it with the message
// Output: Hello, Ravi!

// Using an anonymous function as callback (most common pattern):
greetPerson("Raj", function(msg) {
    console.log(`Custom: ${msg}`);
});

// Using an arrow function as callback (cleanest):
greetPerson("Priya", (msg) => console.log(`Arrow: ${msg}`));


// ================================================================
// REAL USE OF CALLBACKS: setTimeout and setInterval
// ================================================================

/*
  setTimeout  → runs a function ONCE after a delay (milliseconds)
  setInterval → runs a function REPEATEDLY at an interval

  These are the most common real-world callbacks.
  (Full async coverage in File 5 — but good to know these now)
*/

// setTimeout — runs ONCE after 2 seconds:
setTimeout(() => {
    console.log("This runs after 2 seconds");
}, 2000);   // 2000ms = 2 seconds

// setTimeout with a named function:
function remind() {
    console.log("Don't forget to study!");
}
setTimeout(remind, 3000);   // runs after 3 seconds

// setInterval — runs EVERY 1 second:
let secondsPassed = 0;
const intervalId = setInterval(() => {
    secondsPassed++;
    console.log(`${secondsPassed} second(s) passed`);

    if (secondsPassed === 3) {
        clearInterval(intervalId);  // stop after 3 seconds
        console.log("Timer stopped");
    }
}, 1000);

/*
  Note: In the browser, these run asynchronously.
  The code after setTimeout/setInterval runs FIRST,
  then the callback runs after the delay.
  This is the beginning of async JS (covered fully in File 5).
*/


// ================================================================
// 2. HIGHER ORDER FUNCTIONS (HOF) — The Important Ones
// ================================================================

/*
  Higher Order Functions = functions that work WITH other functions.

  The THREE most important HOFs in JS — used constantly in real projects:
  1. .map()    → transform every element → returns NEW array
  2. .filter() → keep only matching elements → returns NEW array
  3. .reduce() → combine all elements → returns SINGLE value

  These all take a CALLBACK FUNCTION as their argument.
  The array methods call your callback for each element.

  These replace most for loops in modern JS.
*/

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


// ----------------------------------------------------------------
// .forEach() — runs a function on each element, returns nothing
// ----------------------------------------------------------------
/*
  Like a for...of loop, but as a method.
  Returns undefined — use when you just want to DO something per item.
  Does NOT create a new array.
*/

numbers.forEach((num) => {
    console.log(num * 2);
});

// Same as:
for (const num of numbers) {
    console.log(num * 2);
}

// forEach with index:
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});


// ----------------------------------------------------------------
// .map() — TRANSFORM each element → new array of same length
// ----------------------------------------------------------------
/*
  Takes a callback that TRANSFORMS each element.
  Returns a NEW array with the transformed values.
  Original array is NOT changed.

  Perfect replacement for: creating a new array from an existing one.
*/

// Double every number:
const doubled = numbers.map((num) => num * 2);
console.log(doubled);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
console.log(numbers); // [1,2,3...10] ← original unchanged

// Square every number:
const squared = numbers.map(num => num ** 2);
console.log(squared);
// [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// Real-world: transform array of objects:
const users = [
    { name: "Ravi",  age: 21 },
    { name: "Priya", age: 19 },
    { name: "Raj",   age: 23 }
];

// Get just the names:
const names = users.map(user => user.name);
console.log(names);  // ["Ravi", "Priya", "Raj"]

// Add a new property to each user:
const usersWithStatus = users.map(user => ({
    ...user,             // spread all existing properties
    isAdult: user.age >= 18
}));
console.log(usersWithStatus);
// [{ name: "Ravi", age: 21, isAdult: true }, ...]


// ----------------------------------------------------------------
// .filter() — KEEP elements that pass a condition → new array
// ----------------------------------------------------------------
/*
  Takes a callback that returns TRUE or FALSE.
  Keeps elements where callback returns TRUE.
  Returns a NEW array (shorter or same length as original).
  Original array is NOT changed.
*/

// Keep only even numbers:
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

// Keep only odd numbers:
const odds = numbers.filter(num => num % 2 !== 0);
console.log(odds);   // [1, 3, 5, 7, 9]

// Keep numbers greater than 5:
const greaterThan5 = numbers.filter(num => num > 5);
console.log(greaterThan5);  // [6, 7, 8, 9, 10]

// Real-world: filter users by age:
const adults = users.filter(user => user.age >= 21);
console.log(adults);  // [{ name: "Ravi", age: 21 }, { name: "Raj", age: 23 }]


// ----------------------------------------------------------------
// .reduce() — COMBINE all elements → single value
// ----------------------------------------------------------------
/*
  The most powerful but slightly tricky HOF.
  Takes a callback and an INITIAL VALUE.
  The callback receives:
    → accumulator (the running result)
    → currentValue (the current element)
  Returns the final accumulated value.

  Used for: sum, product, finding max/min, building objects from arrays.
*/

// Sum of all numbers:
const total = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);  // ← 0 is the initial value of accumulator
console.log(total);  // 55

// Same thing, shorter:
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log(sum);    // 55

// Product of all numbers:
const product = numbers.reduce((acc, cur) => acc * cur, 1);  // start at 1
console.log(product);  // 3628800

// Find maximum value:
const max = numbers.reduce((acc, cur) => cur > acc ? cur : acc, numbers[0]);
console.log(max);   // 10

// Count occurrences:
const fruits2 = ["apple", "banana", "apple", "mango", "banana", "apple"];
const fruitCount = fruits2.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});  // initial value is empty object
console.log(fruitCount);  // { apple: 3, banana: 2, mango: 1 }


// ----------------------------------------------------------------
// CHAINING map + filter + reduce
// ----------------------------------------------------------------
/*
  These methods can be CHAINED — the output of one becomes
  the input of the next. Very common in real projects.
*/

// Get the sum of squares of even numbers:
const result = numbers
    .filter(num => num % 2 === 0)   // keep evens: [2,4,6,8,10]
    .map(num => num ** 2)            // square them: [4,16,36,64,100]
    .reduce((acc, num) => acc + num, 0);  // sum: 220

console.log(result);  // 220

// Real-world: get names of adult users, sorted:
const adultNames = users
    .filter(user => user.age >= 20)
    .map(user => user.name)
    .sort();
console.log(adultNames);  // ["Raj", "Ravi"]


// ----------------------------------------------------------------
// .find() — returns FIRST element that matches
// ----------------------------------------------------------------

const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven);  // 2

const ravi = users.find(user => user.name === "Ravi");
console.log(ravi);  // { name: "Ravi", age: 21 }

// Returns undefined if not found:
const notFound = users.find(user => user.name === "Unknown");
console.log(notFound);  // undefined


// ----------------------------------------------------------------
// .some() and .every()
// ----------------------------------------------------------------

/*
  .some()  → returns true if AT LEAST ONE element passes the test
  .every() → returns true if ALL elements pass the test
  Both return a boolean.
*/

console.log(numbers.some(num => num > 5));    // true (6,7,8,9,10 exist)
console.log(numbers.some(num => num > 100));  // false (none > 100)

console.log(numbers.every(num => num > 0));   // true (all positive)
console.log(numbers.every(num => num > 5));   // false (1,2,3,4,5 fail)

const allAdults = users.every(user => user.age >= 18);
console.log(allAdults);  // true




// ================================================================
// QUICK REVISION — CHEAT SHEET
// ================================================================

/*
  FUNCTIONS — 3 WAYS:
  -------------------
  // Declaration (hoisted):
  function add(a, b) { return a + b; }

  // Expression (not hoisted):
  const add = function(a, b) { return a + b; };

  // Arrow (not hoisted, most used):
  const add = (a, b) => a + b;

  // Arrow shorthand rules:
  const fn = x => x * 2;        // 1 param: no ()
  const fn = () => "hi";        // 0 params: keep ()
  const fn = x => ({ key: x }); // returning object: wrap in ()

  DEFAULT PARAMETERS:
  -------------------
  function greet(name = "Guest") { return `Hello ${name}`; }

  REST vs SPREAD:
  ---------------
  function sum(...nums) { }    // rest → collects INTO array (in params)
  Math.max(...arr);            // spread → expands OUT of array (in calls)
  const merged = [...a, ...b]; // spread to combine arrays

  SCOPE:
  ------
  global  → accessible everywhere
  function→ only inside the function
  block   → only inside the { } block (let/const only)
  var     → ignores blocks (function scoped) ← avoid

  HOISTING:
  ---------
  function declaration  → FULLY hoisted → usable before its line
  var                   → hoisted as undefined → accessible but undefined
  let/const             → TDZ → ReferenceError if accessed before line
  function expression   → follows variable rules (usually not hoisted)
  arrow function        → follows variable rules (usually not hoisted)

  CLOSURES:
  ---------
  → Inner function remembers outer scope even after outer fn finishes
  → Creates private variables
  → Each call to outer fn creates new, independent closure
  → Use for: counters, function factories, data privacy

  CALLBACKS:
  ----------
  → Function passed as argument to another function
  → Common: setTimeout, setInterval, array methods
  setTimeout(() => { }, 2000);   // runs once after 2s
  setInterval(() => { }, 1000);  // runs every 1s
  clearInterval(id);              // stops setInterval

  HIGHER ORDER FUNCTIONS:
  -----------------------
  .forEach(fn)     → run fn on each item, no return value
  .map(fn)         → transform each item → NEW array
  .filter(fn)      → keep items where fn returns true → NEW array
  .reduce(fn, init)→ combine all items → single value
  .find(fn)        → first item where fn is true
  .some(fn)        → true if ANY item passes
  .every(fn)       → true if ALL items pass

  CHAINING:
  array.filter(...).map(...).reduce(...)

  KEY INTERVIEW QUESTIONS:
  ------------------------
  Q: 3 ways to write a function in JS?
  A: Declaration, Expression, Arrow function.
     Declaration is hoisted. Arrow has no own 'this'.

  Q: What is hoisting?
  A: JS moves declarations to the top before execution.
     Declarations: fully usable. var: undefined. let/const: TDZ error.

  Q: What is a closure?
  A: A function that retains access to its outer scope's variables
     even after the outer function has finished running.
     Used for data privacy, function factories, remembering state.

  Q: What is a callback?
  A: A function passed as an argument to another function,
     to be called at a specific time or event.

  Q: What is a Higher Order Function?
  A: A function that takes a function as an argument OR returns a function.
     Examples: map, filter, reduce, forEach.

  Q: Difference between map, filter, reduce?
  A: map    → transforms each element → new array of SAME length
     filter → keeps elements that pass test → new array of SAME or LESS length
     reduce → combines all elements → SINGLE value (any type)

  Q: Rest vs Spread operator?
  A: Both use ... but opposite purposes.
     Rest   → in function params → collects arguments INTO an array
     Spread → in calls/arrays   → expands array OUT into individual values
*/