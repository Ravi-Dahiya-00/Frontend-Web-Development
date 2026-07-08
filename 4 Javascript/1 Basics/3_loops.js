// ================================================================
// SECTION 5 — 3_loops.js
// TOPIC: Loops — for, while, do-while, for...of, for...in
// ================================================================

// ================================================================
// 1. for LOOP
// ================================================================

/*
  Identical to C++. Most used loop in JS.
  Syntax: for (initializer; condition; update) { }
*/

// Basic for loop:
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}
// Output: Iteration 0, 1, 2, 3, 4

// Counting down:
for (let i = 10; i >= 0; i--) {
    console.log(i);
}

// Looping through an array (by index):
const fruits = ["apple", "banana", "mango", "orange"];

for (let i = 0; i < fruits.length; i++) {
    console.log(`${i}: ${fruits[i]}`);
}


// ================================================================
// 2. while LOOP
// ================================================================

/*
  Same as C++. Use when you don't know the number of iterations
  in advance — when you loop based on a condition, not a counter.
*/

let count = 1;

while (count <= 5) {
    console.log(`Count: ${count}`);
    count++;
}

// Real-world example — keep asking until valid input:
let attempts = 0;
const maxAttempts = 3;

while (attempts < maxAttempts) {
    console.log(`Attempt ${attempts + 1}`);
    // In a real app, you'd check user input here
    attempts++;
}


// ================================================================
// 3. do...while LOOP
// ================================================================

/*
  Executes the block AT LEAST ONCE, then checks the condition.
  Same as C++. Less common than for/while.

  Use when: the code must run once before checking — e.g. show
  a menu to the user at least once before checking their choice.
*/

let num = 1;

do {
    console.log(`do-while: ${num}`);
    num++;
} while (num <= 3);

// Even if condition is false from the start, runs ONCE:
let n = 100;
do {
    console.log("This runs once even though 100 > 3");
} while (n < 3);


// ================================================================
// 4. for...of LOOP — New in ES6 (Most used for arrays)
// ================================================================

/*
  Loops through the VALUES of an iterable (array, string, etc.)
  Much cleaner than a regular for loop when you don't need the index.
  This is the PREFERRED way to loop through arrays in modern JS.
*/

const colors = ["red", "green", "blue", "yellow"];

// Old way (for loop):
for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}

// Modern way (for...of) — cleaner:
for (const color of colors) {
    console.log(color);   // red, green, blue, yellow
}

// for...of on a string (loops through each character):
const word = "Hello";
for (const char of word) {
    console.log(char);   // H, e, l, l, o
}

/*
  for...of gives you the VALUE of each item.
  If you also need the INDEX, use .entries():
*/
for (const [index, color] of colors.entries()) {
    console.log(`${index}: ${color}`);
}
// Output: 0: red, 1: green, 2: blue, 3: yellow


// ================================================================
// 5. for...in LOOP — For objects
// ================================================================

/*
  Loops through the KEYS of an object.
  (Objects are covered in File 3, but here's the intro.)
  Do NOT use for...in on arrays — use for...of instead.
*/

const person = {
    name: "Ravi",
    age: 21,
    city: "Mumbai"
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
// Output:
// name: Ravi
// age: 21
// city: Mumbai

/*
  for...in → loops through KEYS of an object
  for...of → loops through VALUES of an iterable (array, string)

  NEVER use for...in on arrays — use for...of or forEach instead.
*/


// ================================================================
// 6. break and continue (same as C++)
// ================================================================

// break — exits the loop completely:
for (let i = 0; i < 10; i++) {
    if (i === 5) break;      // stop when i reaches 5
    console.log(i);           // prints 0, 1, 2, 3, 4
}

// continue — skips the current iteration, goes to next:
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) continue;  // skip even numbers
    console.log(i);              // prints 1, 3, 5, 7, 9 (odd numbers only)
}


// ================================================================
// 7. NESTED LOOPS (same as C++)
// ================================================================

// Multiplication table:
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i} × ${j} = ${i * j}`);
    }
}




// ================================================================
// QUICK REVISION — CHEAT SHEET
// ================================================================

/*
  VARIABLES:
  ----------
  const  → value NEVER changes. Use by default.
  let    → value WILL change. Use when needed.
  var    → NEVER use. Old, function-scoped, has bugs.

  DATA TYPES:
  -----------
  string    → "text", 'text', `template ${var}`
  number    → 42, 3.14, NaN, Infinity
  boolean   → true, false
  undefined → declared but not assigned (JS sets this)
  null      → intentionally empty (you set this)

  typeof "hi"        → "string"
  typeof 42          → "number"
  typeof true        → "boolean"
  typeof undefined   → "undefined"
  typeof null        → "object"  ← JS bug, should be "null"

  FALSY VALUES (6 total — memorise):
  false, 0, "", null, undefined, NaN

  TYPE CONVERSION:
  ----------------
  Number("42")    → 42
  String(42)      → "42"
  Boolean(0)      → false
  parseInt("5px") → 5
  parseFloat("3.14em") → 3.14

  TYPE COERCION:
  --------------
  "5" + 3   → "53"  (+ with string = concatenation)
  "5" - 3   → 2     (- converts string to number)
  "5" == 5  → true  (== does coercion)
  "5" === 5 → false (=== does not — ALWAYS USE ===)

  OPERATORS:
  ----------
  +, -, *, /, %, **          arithmetic
  =, +=, -=, *=, /=, %=     assignment
  ==, !=                     loose equality (AVOID)
  ===, !==                   strict equality (ALWAYS USE)
  >, <, >=, <=               comparison
  &&, ||, !                  logical
  condition ? a : b          ternary
  ??                         nullish coalescing (null/undefined only)

  CONDITIONALS:
  -------------
  if / else if / else   → for ranges and complex conditions
  switch                → for exact value comparisons on one variable
  switch uses === internally

  LOOPS:
  ------
  for (let i=0; i<n; i++)   → when you know iteration count
  while (condition)          → when you don't know count
  do { } while(condition)    → when it must run at least once
  for (const item of array)  → modern, preferred for arrays ✅
  for (const key in object)  → for object keys only

  KEY INTERVIEW QUESTIONS:
  ------------------------
  Q: Difference between var, let, const?
  A: var is function-scoped, can be redeclared, hoisted as undefined. Avoid.
     let is block-scoped, can be reassigned. Use when value changes.
     const is block-scoped, cannot be reassigned. Use by default.

  Q: Difference between == and ===?
  A: == does type coercion before comparing (loose).
     === compares value AND type without coercion (strict). Always use ===.

  Q: What are falsy values in JS?
  A: false, 0, "" (empty string), null, undefined, NaN.

  Q: Difference between null and undefined?
  A: undefined = variable declared but no value assigned (JS sets it).
     null = intentionally empty value (developer sets it).

  Q: What is the ternary operator?
  A: Shorthand for if/else: condition ? valueIfTrue : valueIfFalse

  Q: Difference between for...of and for...in?
  A: for...of loops through VALUES of an iterable (array, string).
     for...in loops through KEYS of an object. Don't use for...in on arrays.

  Q: What is ?? (nullish coalescing)?
  A: Returns right side only if left side is null or undefined.
     Unlike ||, does not trigger on 0 or "" — use when those are valid values.
*/