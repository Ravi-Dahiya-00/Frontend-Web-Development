
// ================================================================
// SECTION 3 — 2_operators_conditional.js
// TOPIC: Operators
// ================================================================

/*
  JS operators work almost identically to C++.
  The key differences are == vs === and some new ones.
*/


// ================================================================
// 1. ARITHMETIC OPERATORS
// ================================================================

console.log(10 + 3);   // 13  addition
console.log(10 - 3);   // 7   subtraction
console.log(10 * 3);   // 30  multiplication
console.log(10 / 3);   // 3.333...  division (always gives decimal in JS)
console.log(10 % 3);   // 1   modulo (remainder)
console.log(10 ** 2);  // 100 exponentiation (new in ES6, same as Math.pow)

// Increment / Decrement (same as C++):
let x = 5;
x++;              // post-increment: x becomes 6
++x;              // pre-increment: x becomes 7
x--;              // post-decrement: x becomes 6
--x;              // pre-decrement: x becomes 5

// Difference (post vs pre — same as C++):
let a = 5;
console.log(a++); // prints 5, THEN increments → a is now 6
console.log(++a); // increments FIRST → a is 7, then prints 7


// ================================================================
// 2. ASSIGNMENT OPERATORS
// ================================================================

let val = 10;
val += 5;    // val = val + 5   → 15  (same as C++)
val -= 3;    // val = val - 3   → 12
val *= 2;    // val = val * 2   → 24
val /= 4;    // val = val / 4   → 6
val %= 4;    // val = val % 4   → 2
val **= 3;   // val = val ** 3  → 8

console.log(val);  // 8


// ================================================================
// 3. COMPARISON OPERATORS — the most important JS topic
// ================================================================

/*
  == (Loose Equality) — compares VALUES only, IGNORES types
  → Does type coercion before comparing
  → Avoid in real code

  === (Strict Equality) — compares VALUE and TYPE
  → Does NOT do type coercion
  → ALWAYS use === in real code

  This is the most important operator difference from C++.
  C++ only has ==. JS has both, and they behave very differently.
*/

// == (loose) — converts types before comparing:
console.log(5 == "5");       // true  ← "5" coerced to 5
console.log(0 == false);     // true  ← false coerced to 0
console.log(0 == "");        // true  ← both coerced to 0
console.log(null == undefined); // true  ← special JS rule
console.log(1 == true);      // true  ← true coerced to 1

// === (strict) — NO coercion, types must match:
console.log(5 === "5");      // false ← number vs string
console.log(0 === false);    // false ← number vs boolean
console.log(null === undefined); // false ← different types
console.log(1 === true);     // false ← number vs boolean
console.log(5 === 5);        // true  ← same value AND same type ✅

// != (loose not equal) and !== (strict not equal):
console.log(5 != "5");       // false ← they ARE equal after coercion
console.log(5 !== "5");      // true  ← they are NOT strictly equal ✅

// Other comparisons (same as C++):
console.log(10 > 5);    // true
console.log(10 < 5);    // false
console.log(10 >= 10);  // true
console.log(10 <= 9);   // false

/*
  RULE: ALWAYS use === and !==. Never use == and !=.
  The only exception: checking for null OR undefined at the same time:
  if (value == null) { } → catches both null and undefined (acceptable)
*/


// ================================================================
// 4. LOGICAL OPERATORS
// ================================================================

/*
  Same symbols as C++, but JS has extra behaviour beyond just booleans.
*/

// && (AND) — true only if BOTH are true:
console.log(true && true);   // true
console.log(true && false);  // false
console.log(false && true);  // false

// || (OR) — true if AT LEAST ONE is true:
console.log(true || false);  // true
console.log(false || false); // false

// ! (NOT) — flips the boolean:
console.log(!true);   // false
console.log(!false);  // true

// Real use:
const isAdult = true;
const hasID = true;
if (isAdult && hasID) {
    console.log("Entry allowed");
}

// Short-circuit evaluation (important — interviewers ask this):
/*
  && short-circuits on FALSE:
  → If the LEFT side is falsy, JS skips the RIGHT side entirely.
  false && someFunction()  → someFunction never runs

  || short-circuits on TRUE:
  → If the LEFT side is truthy, JS skips the RIGHT side entirely.
  true || someFunction()   → someFunction never runs

  WHY THIS MATTERS — real use:
*/

const user = null;
// Without short-circuit (crashes):
// console.log(user.name);   ← ERROR: Cannot read property 'name' of null

// With short-circuit (safe):
console.log(user && user.name);  // null — safely returns null without crashing
                                  // because user is falsy, right side is skipped

// || for default values (old way):
const inputName = "";
const displayName = inputName || "Guest";
console.log(displayName);  // "Guest" ← because "" is falsy, uses right side


// ================================================================
// 5. NULLISH COALESCING OPERATOR ?? (New — ES2020)
// ================================================================

/*
  ?? returns the RIGHT side only if the LEFT side is null or undefined.
  Unlike ||, it does NOT trigger on other falsy values (0, "", false).

  This is the modern, safer alternative to || for default values.
*/

const userScore = 0;

// || problem:
console.log(userScore || 100);  // 100 — WRONG! 0 is a valid score, but || treats 0 as falsy

// ?? fix:
console.log(userScore ?? 100);  // 0 — CORRECT! ?? only replaces null/undefined

const userName = null;
console.log(userName ?? "Guest");  // "Guest" ← null → uses default

const emptyStr = "";
console.log(emptyStr ?? "default"); // "" ← empty string is NOT null/undefined → keeps ""

/*
  INTERVIEW TIP:
  "What is the difference between || and ?? for default values?"
  || uses the right side if left is ANY falsy value (0, "", false, null, undefined)
  ?? uses the right side ONLY if left is null or undefined.
  Use ?? when 0 or "" are valid values you want to keep.
*/


// ================================================================
// 6. TERNARY OPERATOR
// ================================================================

/*
  A shorthand for simple if/else.
  Same as C++ ternary.

  Syntax: condition ? valueIfTrue : valueIfFalse
*/

const userAge = 20;

// Without ternary:
let accessLevel;
if (userAge >= 18) {
    accessLevel = "Adult";
} else {
    accessLevel = "Minor";
}

// With ternary (same result, one line):
const access = userAge >= 18 ? "Adult" : "Minor";
console.log(access);  // Adult4

// Ternary in a template literal:
console.log(`User is ${userAge >= 18 ? "an adult" : "a minor"}`);

// Nested ternary (use carefully — gets hard to read):
const grade = 75;
const result = grade >= 90 ? "A" : grade >= 75 ? "B" : grade >= 60 ? "C" : "F";
console.log(result);  // B








// ================================================================
// SECTION 4 — (continuation of 2_operators_conditional.js)
// TOPIC: Conditionals — if/else, switch
// ================================================================

// ================================================================
// 1. if / else if / else
// ================================================================

/*
  Identical to C++ syntax.
*/

const temperature = 35;

if (temperature > 40) {
    console.log("Extremely hot");
} else if (temperature > 30) {
    console.log("Hot day");          // ← this runs (35 > 30)
} else if (temperature > 20) {
    console.log("Warm day");
} else {
    console.log("Cool day");
}

// Truthy/falsy in conditions:
const password = "";

if (password) {
    console.log("Password entered");
} else {
    console.log("Password is empty");  // ← "" is falsy → runs this
}

// Checking for null/undefined:
const userData = null;

if (userData === null) {
    console.log("No user data");
}

// Better way — check for both null and undefined at once:
if (userData == null) {   // the ONE acceptable use of ==
    console.log("No user data (null or undefined)");
}


// ================================================================
// 2. SWITCH STATEMENT
// ================================================================

/*
  Use switch when you have ONE variable being compared to MULTIPLE
  exact values. Cleaner than a long if/else if chain.

  Syntax is same as C++. The break is important — without it,
  execution "falls through" to the next case.
*/

const day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;               // ← stop here, don't run other cases
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("Midweek");
        break;
    case "Friday":
        console.log("End of work week!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:                 // ← like 'else' — runs if no case matches
        console.log("Invalid day");
}
// Output: Start of work week

/*
  SWITCH uses === (strict equality) for comparison internally.

  WHEN TO USE switch vs if/else:
  switch → comparing ONE variable to EXACT values (good for menus, states)
  if/else → ranges, complex conditions, multiple variables
*/
