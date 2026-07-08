// ================================================================
// JAVASCRIPT — FILE 1: FOUNDATIONS
// ================================================================
// HOW TO USE THIS FILE:
// Each section below becomes its own .js file in your project.
// Split them exactly like your folder structure in the image.
//
// YOUR FOLDER STRUCTURE:
// JavascriptBasics/
// ├── datatypes/
// │   └── datatypes.js        ← Section 2
// ├── 1_javascript.js         ← Section 1
// ├── 2_operators_conditional.js ← Section 3 + 4
// ├── 3_loops.js              ← Section 5
// └── index.html              ← to run and test in browser
//
// HOW TO RUN JAVASCRIPT:
// Option 1 → Browser Console: F12 → Console tab → paste and run
// Option 2 → Link to HTML:    <script src="1_javascript.js"></script>
// Option 3 → Node.js:         node 1_javascript.js  (in terminal)
// ================================================================







// ================================================================
// SECTION 2 — datatypes/datatypes.js
// TOPIC: Data Types
// ================================================================

/*
  DATA TYPES IN JAVASCRIPT
  ========================
  JS has 7 primitive data types + Objects.

  PRIMITIVE TYPES (stored by value):
  1. String
  2. Number
  3. Boolean
  4. Undefined
  5. Null
  6. Symbol     (advanced — skip for now)
  7. BigInt     (advanced — skip for now)

  NON-PRIMITIVE:
  8. Object (includes Arrays, Functions — covered in later files)

  KEY DIFFERENCE FROM C++:
  → C++ is STATICALLY typed: you declare the type: int age = 21;
  → JS is DYNAMICALLY typed: type is determined by the VALUE
    let age = 21;       → JS sees it's a number
    let age = "Ravi";   → JS sees it's a string
    age = true;         → now it's a boolean — JS allows this!

  This flexibility is powerful but can cause bugs if not careful.
*/


// ================================================================
// 1. STRING
// ================================================================

/*
  A string is a sequence of characters — text.
  In JS, strings can be written in 3 ways:
  1. Single quotes:   'Hello'
  2. Double quotes:   "Hello"
  3. Backticks:       `Hello`   ← called Template Literals (most powerful)

  All 3 are valid. Be consistent — pick one and stick to it.
  Convention: use single quotes or backticks in modern JS.
*/

const firstName = "Ravi";
const lastName = 'Yadav';
const city = "Mumbai";

console.log(firstName);          // Ravi
console.log(typeof firstName);   // string  ← typeof tells you the type

// String with quotes inside — use the OTHER quote type to avoid conflict:
const sentence1 = "He said 'hello' to me";     // single inside double ✅
const sentence2 = 'She said "goodbye" to him';  // double inside single ✅

// Template Literals (backticks) — the modern, preferred way
// → Allows EMBEDDED EXPRESSIONS using ${ }
// → Allows MULTI-LINE strings without \n

const age = 21;
const greeting = `Hello, my name is ${firstName} and I am ${age} years old.`;
console.log(greeting);
// Output: Hello, my name is Ravi and I am 21 years old.

// Any expression works inside ${ }
console.log(`2 + 3 = ${2 + 3}`);              // 2 + 3 = 5
console.log(`Uppercase: ${firstName.toUpperCase()}`); // RAVI

// Multi-line string with template literal:
const multiLine = `Line 1
Line 2
Line 3`;
console.log(multiLine);

// Without template literal (old way — messy):
const oldMultiLine = "Line 1\nLine 2\nLine 3";  // \n = newline character

/*
  COMMON STRING PROPERTIES AND METHODS:
  (More string methods in JS File 1 — strings section)
*/

const str = "Hello World";
console.log(str.length);          // 11 — number of characters
console.log(str.toUpperCase());   // HELLO WORLD
console.log(str.toLowerCase());   // hello world
console.log(str[0]);              // H — access by index (0-based, like C++)
console.log(str[6]);              // W


// ================================================================
// 2. NUMBER
// ================================================================

/*
  In C++, you have int, float, double, long etc.
  In JS, there is just ONE type for ALL numbers: Number.
  → Integers: 42, -10, 0
  → Decimals: 3.14, -0.5, 100.0
  → All are just "number" in JS.

  JS uses 64-bit floating point (IEEE 754) for all numbers.
  Range: up to 2^53 - 1 safely (about 9 quadrillion).
  For larger numbers, use BigInt (not needed now).
*/

const intNum = 42;
const floatNum = 3.14;
const negNum = -100;
const zero = 0;

console.log(typeof intNum);    // number
console.log(typeof floatNum);  // number (no separate float type in JS)

// Basic arithmetic (same as C++):
console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.3333... (JS gives full decimal, unlike C++ int division)
console.log(10 % 3);   // 1  (modulo — remainder)
console.log(10 ** 3);  // 1000 (exponentiation — 10 to the power 3)
                       // In C++ you'd use pow(10, 3)

// Special number values in JS (unique to JS — good to know):
console.log(10 / 0);          // Infinity (not an error like C++!)
console.log(-10 / 0);         // -Infinity
console.log("abc" * 2);       // NaN — Not a Number
console.log(typeof NaN);      // number (yes, NaN is of type number — weird but true)

/*
  NaN (Not a Number):
  → Result of an invalid math operation: "hello" * 2
  → NaN is the only value in JS that is NOT equal to itself:
    NaN === NaN  → false  (use isNaN() to check instead)
  
  isNaN("hello") → true
  isNaN(42)      → false
  isNaN(NaN)     → true
*/

// Math object (built-in, like C++ <cmath>):
console.log(Math.round(4.6));   // 5  — rounds to nearest integer
console.log(Math.floor(4.9));   // 4  — always rounds DOWN
console.log(Math.ceil(4.1));    // 5  — always rounds UP
console.log(Math.abs(-10));     // 10 — absolute value
console.log(Math.max(3, 7, 1)); // 7  — maximum value
console.log(Math.min(3, 7, 1)); // 1  — minimum value
console.log(Math.sqrt(16));     // 4  — square root
console.log(Math.pow(2, 8));    // 256 — power
console.log(Math.PI);           // 3.141592653589793
console.log(Math.random());     // random decimal between 0 and 1 (exclusive)

// Random integer between 1 and 10:
const randomInt = Math.floor(Math.random() * 10) + 1;
console.log(randomInt);


// ================================================================
// 3. BOOLEAN
// ================================================================

/*
  Boolean has only 2 values: true or false.
  Same as C++. Used for conditions, flags, toggles.
*/

const isOnline = true;
const hasSubscription = false;

console.log(typeof isOnline);   // boolean

// Booleans come from comparisons:
console.log(10 > 5);     // true
console.log(10 < 5);     // false
console.log(10 === 10);  // true
console.log(10 !== 5);   // true

// Used in conditions (more in Section 3):
if (isOnline) {
    console.log("User is online");
}


// ================================================================
// 4. UNDEFINED
// ================================================================

/*
  undefined means a variable has been DECLARED but not ASSIGNED a value.
  JS automatically gives it the value undefined.

  It's NOT an error — it's a valid value meaning "no value yet".
*/

let username;
console.log(username);           // undefined
console.log(typeof username);    // "undefined"

// A function that returns nothing also returns undefined:
function doNothing() {
    // no return statement
}
console.log(doNothing());   // undefined


// ================================================================
// 5. NULL
// ================================================================

/*
  null means INTENTIONALLY empty — "I am deliberately setting this to nothing."
  A developer assigns null on purpose.

  DIFFERENCE: undefined vs null
  → undefined → JS assigned it (variable declared but not set)
  → null      → YOU assigned it (you intentionally said "no value")

  Real use: reset a value, clear a variable, say "nothing here on purpose"
*/

let selectedUser = null;    // no user selected yet — by our choice
console.log(selectedUser);           // null
console.log(typeof selectedUser);    // "object" ← famous JS bug/quirk
                                     // null's type is "object" — it's wrong
                                     // but it's been in JS since the beginning
                                     // and can't be changed (would break the web)

// To properly check for null:
if (selectedUser === null) {
    console.log("No user selected");
}

/*
  INTERVIEW TIP — VERY COMMONLY ASKED:
  "What is the difference between undefined and null?"
  undefined → variable declared but no value assigned. JS sets it automatically.
  null      → intentionally empty value. Developer sets it explicitly.
  typeof null === "object" is a known JS bug — it should be "null".
*/


// ================================================================
// 6. typeof OPERATOR
// ================================================================

/*
  typeof returns the data type of a value as a STRING.
  Use it to check what type a variable holds.
*/

console.log(typeof "Hello");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof 3.14);        // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"  ← the famous JS bug
console.log(typeof [1, 2, 3]);   // "object"  ← arrays are objects in JS
console.log(typeof {});          // "object"
console.log(typeof function(){}); // "function"


// ================================================================
// 7. TYPE CONVERSION vs TYPE COERCION
// ================================================================

/*
  TYPE CONVERSION (Explicit) — YOU do it on purpose
  → You call a function to convert from one type to another.

  TYPE COERCION (Implicit) — JS does it automatically
  → JS silently converts types when it needs to.
  → This is a unique JS feature — doesn't exist in C++.
  → Can cause surprising, hard-to-find bugs.
*/


// --- TYPE CONVERSION (Explicit) ---

// String to Number:
const strNumber = "42";
console.log(typeof strNumber);       // string
const converted = Number(strNumber);
console.log(converted);              // 42
console.log(typeof converted);       // number

Number("3.14");   // 3.14
Number("abc");    // NaN  (can't convert)
Number(true);     // 1
Number(false);    // 0
Number(null);     // 0
Number(undefined);// NaN

// parseInt and parseFloat (for strings with numbers):
parseInt("42px");     // 42  ← extracts the integer, ignores "px"
parseFloat("3.14em"); // 3.14 ← extracts the float, ignores "em"
parseInt("abc");      // NaN

// Number to String:
const num = 100;
const numStr = String(num);
console.log(numStr);         // "100"
console.log(typeof numStr);  // string

String(true);   // "true"
String(null);   // "null"
String(42);     // "42"

// Or use .toString():
(42).toString();     // "42"
(255).toString(16);  // "ff"  ← converts to hex (base 16)
(8).toString(2);     // "1000" ← converts to binary (base 2)

// To Boolean:
Boolean(0);         // false
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false
// Everything above = FALSE. These are called FALSY values.

Boolean(1);         // true
Boolean("hello");   // true
Boolean([]);        // true  (even empty array!)
Boolean({});        // true  (even empty object!)
// Anything not falsy = TRUE. These are called TRUTHY values.

/*
  FALSY VALUES — memorise these 6:
  false, 0, "" (empty string), null, undefined, NaN
  → All of these evaluate to false in a condition

  TRUTHY VALUES — everything else:
  true, any number except 0, any non-empty string, [], {}
  → All of these evaluate to true in a condition

  INTERVIEW TIP:
  "What are falsy values in JavaScript?"
  The 6 falsy values: false, 0, "" (empty string), null, undefined, NaN.
  Everything else is truthy — including empty arrays and empty objects.
*/


// --- TYPE COERCION (Implicit) ---
// JS auto-converts types. This is unique to JS.

// + operator with a string causes NUMBER → STRING conversion:
console.log("5" + 3);      // "53"  ← NOT 8! JS converts 3 to "3" and concatenates
console.log("5" + 3 + 2);  // "532" ← left to right: "5"+"3"="53", "53"+2="532"
console.log(5 + 3 + "2");  // "82"  ← 5+3=8 first (both numbers), then 8+"2"="82"

// Other operators convert STRING → NUMBER:
console.log("5" - 3);   // 2   ← JS converts "5" to 5
console.log("5" * 2);   // 10  ← JS converts "5" to 5
console.log("10" / 2);  // 5   ← JS converts "10" to 5
console.log("5" - "3"); // 2   ← both converted to numbers

// This is why == vs === matters (next section):
console.log("5" == 5);  // true  ← == does coercion, converts before comparing
console.log("5" === 5); // false ← === does NOT coerce, types must match



