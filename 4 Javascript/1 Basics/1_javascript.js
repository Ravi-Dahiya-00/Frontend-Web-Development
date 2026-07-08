
// ================================================================
// SECTION 1 — 1_javascript.js
// TOPIC: What is JavaScript + Variables (var, let, const)
// ================================================================

/*
  WHAT IS JAVASCRIPT?
  ===================
  JavaScript (JS) is a programming language that runs in the browser.
  It makes web pages INTERACTIVE.

  HTML  → Structure  (the skeleton)
  CSS   → Appearance (the skin)
  JS    → Behaviour  (the muscles — makes things move and respond)

  Examples of JS in action:
  → Click a button → something happens
  → Form validation → "email is required" message
  → Image slider that auto-scrolls
  → Dark mode toggle
  → Fetching weather data and displaying it

  JS runs in TWO places:
  1. Browser  → frontend JS (what we're learning now)
  2. Server   → Node.js (backend JS, learned later)

  HOW TO LINK JS TO HTML:
  -----------------------
  <!-- At the BOTTOM of <body> — best practice -->
  <script src="1_javascript.js"></script>

  Or inline (for quick testing only):
  <script>
    console.log("hello");
  </script>

  console.log():
  → Prints output to the browser console (F12 → Console tab)
  → Your main tool for testing and debugging
  → Like cout in C++
*/

console.log("Hello from JavaScript!");   // prints to console
console.log(42);                         // numbers work too
console.log(true);                       // booleans too
console.log("Age:", 21, "Name:", "Ravi"); // multiple values


// ================================================================
// VARIABLES — var, let, const
// ================================================================

/*
  A variable is a named container that stores a value.
  You already know this from C++. Syntax is just different.

  C++:  int age = 21;
  JS:   let age = 21;

  JS has 3 keywords to declare variables: var, let, const.

  THE SIMPLE RULE:
  → Use const by default (when value won't change)
  → Use let when value needs to change
  → NEVER use var (outdated, has problems — explained below)
*/


// --- const ---
// Used when the value will NEVER change after assignment.
// Trying to reassign throws an error.

const name = "Ravi";
const country = "India";
const PI = 3.14159;

console.log(name);      // Ravi
console.log(country);   // India
console.log(PI);        // 3.14159

// name = "Raj";  ← ERROR: Assignment to constant variable.

/*
  WHEN TO USE const:
  → Configuration values: const MAX_SIZE = 100;
  → Values you fetch once: const userAge = 21;
  → Object and array references (explained in later files)
  → Basically use const UNLESS you know the value will change
*/


// --- let ---
// Used when the value WILL change later.

let score = 0;
console.log(score);   // 0

score = 10;           // reassignment — works fine with let
console.log(score);   // 10

score = score + 5;    // update the value
console.log(score);   // 15

let isLoggedIn = false;
isLoggedIn = true;    // fine with let
console.log(isLoggedIn); // true

/*
  WHEN TO USE let:
  → Loop counters: let i = 0;
  → Values that update: let score = 0; score++;
  → Flags that change: let isOpen = false; isOpen = true;
*/


// --- var ---
// OLD way to declare variables. DO NOT USE.
// Kept here so you understand legacy code.

var oldVariable = "I am old";
console.log(oldVariable);

/*
  WHY var IS PROBLEMATIC — 3 reasons:
  =====================================

  PROBLEM 1: var is FUNCTION scoped, not BLOCK scoped.
  → let and const are block scoped (live inside their { } block)
  → var leaks OUT of blocks — causes unexpected bugs

  EXAMPLE:
  if (true) {
    var x = 10;   // var leaks out of the if block
    let y = 20;   // let stays inside the if block
  }
  console.log(x);  // 10 → var leaked out ❌
  console.log(y);  // ERROR: y is not defined ✅ (expected)

  PROBLEM 2: var allows REDECLARATION — no error if you declare twice.
  var name = "Ravi";
  var name = "Raj";  // no error — overwrites silently ❌
  let age = 21;
  let age = 22;      // ERROR: already been declared ✅ (catches mistake)

  PROBLEM 3: var is HOISTED and initialized as undefined.
  → Explained in JS File 2 (hoisting section)

  BOTTOM LINE: var was the only option before ES6 (2015).
  Modern JS uses let and const. Always.

  INTERVIEW TIP:
  "What is the difference between var, let, and const?"
  var   → function scoped, can be redeclared, hoisted as undefined. Avoid.
  let   → block scoped, can be reassigned, not redeclared. Use when value changes.
  const → block scoped, cannot be reassigned or redeclared. Use by default.
*/


// --- Declaring without assigning ---
let userInput;           // declared but not assigned
console.log(userInput);  // undefined (not an error — just no value yet)

userInput = "Hello";
console.log(userInput);  // Hello

// const MUST be assigned when declared:
// const x;  ← ERROR: Missing initializer in const declaration


// --- Naming Rules ---
/*
  Variable naming rules in JS (same as C++):
  → Can contain: letters, digits, underscore _, dollar $
  → Cannot start with a digit
  → Case sensitive: myName ≠ myname ≠ MyName
  → Cannot use reserved keywords: let, const, if, for, etc.

  CONVENTION in JavaScript (different from C++):
  → camelCase is the standard:   firstName, totalScore, isLoggedIn
  → C++ uses:                    first_name, total_score (snake_case)
  → Constants (fixed values):    SCREAMING_SNAKE_CASE → MAX_SIZE, API_URL

  GOOD NAMES:
  let firstName = "Ravi";
  let totalScore = 100;
  let isLoggedIn = false;
  const MAX_ATTEMPTS = 3;

  BAD NAMES:
  let x = "Ravi";        // meaningless
  let data = 100;        // vague
  let flag = false;      // what flag?
*/
