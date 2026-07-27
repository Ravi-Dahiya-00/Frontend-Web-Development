// ================================================================
// SECTION 3 — 3_hoisting.js
// TOPIC: Hoisting
// ================================================================

/*
  WHAT IS HOISTING?
  =================
  Before executing your code, JS "hoists" (moves) certain
  declarations to the TOP of their scope.

  This is UNIQUE to JavaScript — doesn't exist in C++.
  Understanding it explains many confusing JS behaviors.

  TWO THINGS GET HOISTED:
  1. Function Declarations → fully hoisted (work before their line)
  2. var declarations      → partially hoisted (exist but = undefined)

  NOT HOISTED:
  3. let and const         → NOT hoisted (or in "temporal dead zone")
  4. Function Expressions  → NOT hoisted (const/let variable)
  5. Arrow Functions       → NOT hoisted
*/


// ================================================================
// 1. FUNCTION DECLARATION HOISTING
// ================================================================

/*
  Function declarations are FULLY hoisted.
  You can CALL them BEFORE they are defined in the file.
  JS moves the entire function to the top before running.
*/

// Calling BEFORE definition — works with declaration:
console.log(sayHello("Ravi"));  // Hello, Ravi! ✅ — works even before definition

function sayHello(name) {
    return `Hello, ${name}!`;
}

// This is what JS ACTUALLY does before running (conceptually):
/*
  function sayHello(name) { return `Hello, ${name}!`; }  ← moved to top
  console.log(sayHello("Ravi"));   ← then this runs
*/


// ================================================================
// 2. var HOISTING
// ================================================================

/*
  var declarations are PARTIALLY hoisted:
  → The DECLARATION is hoisted (variable is created)
  → But the ASSIGNMENT (value) is NOT hoisted
  → So the variable exists but its value is undefined

  This is why var causes subtle bugs.
*/

console.log(myVar);   // undefined (NOT an error — var is hoisted as undefined)
var myVar = "Hello";
console.log(myVar);   // Hello

// What JS actually does (conceptually):
/*
  var myVar;              ← declaration hoisted to top, value = undefined
  console.log(myVar);    ← undefined (exists but no value yet)
  myVar = "Hello";       ← assignment stays here
  console.log(myVar);    ← Hello
*/


// ================================================================
// 3. let AND const HOISTING — Temporal Dead Zone (TDZ)
// ================================================================

/*
  let and const ARE technically hoisted (moved to top),
  but they are NOT initialized. They live in the "Temporal Dead Zone"
  from the start of the block until their declaration line.

  Accessing them before their line → ReferenceError.
  This is BETTER behavior than var — it catches mistakes.
*/

// console.log(myLet);   // ❌ ReferenceError: Cannot access 'myLet' before initialization
let myLet = "Hello";
console.log(myLet);     // Hello ✅

// console.log(myConst); // ❌ ReferenceError
const myConst = "World";
console.log(myConst);   // World ✅

/*
  TEMPORAL DEAD ZONE (TDZ):
  The region between the start of a block and the let/const declaration.
  Variable exists (hoisted) but cannot be accessed — hence "dead zone."

  var  → hoisted + initialized as undefined → accessible (but undefined)
  let  → hoisted + NOT initialized → TDZ → ReferenceError if accessed early
  const→ hoisted + NOT initialized → TDZ → ReferenceError if accessed early

  let/const behavior is SAFER — you get an error instead of silent undefined.
*/


// ================================================================
// 4. FUNCTION EXPRESSION AND ARROW FUNCTION HOISTING
// ================================================================

/*
  Function expressions and arrow functions are stored in variables.
  The variable is hoisted but the function value is NOT.
  → If stored in var → variable is undefined before the line
  → If stored in let/const → TDZ → ReferenceError
*/

// console.log(arrowFn());   // ❌ ReferenceError (const → TDZ)
const arrowFn = () => "I am an arrow function";
console.log(arrowFn());     // ✅ I am an arrow function

// console.log(exprFn());    // ❌ TypeError: exprFn is not a function
var exprFn = function() { return "expression"; };
// (var is hoisted as undefined, calling undefined() → TypeError)


// ================================================================
// HOISTING SUMMARY TABLE
// ================================================================

/*
  Type                    Hoisted?    Usable before declaration?
  ──────────────────────────────────────────────────────────────
  function declaration    ✅ Fully    ✅ Yes (entire function moved up)
  var                     ✅ Partial  ⚠️ Yes, but value = undefined
  let                     ✅ Partial  ❌ No — TDZ → ReferenceError
  const                   ✅ Partial  ❌ No — TDZ → ReferenceError
  function expression     ❌ No*      ❌ No (follows variable rules)
  arrow function          ❌ No*      ❌ No (follows variable rules)

  * The variable is hoisted, but the function value is not.

  BEST PRACTICE:
  → Always define before you use (even though declarations are hoisted)
  → Use const/let → get clear errors instead of silent undefined
  → Avoid var → its hoisting behavior causes confusing bugs

  INTERVIEW TIP — VERY COMMONLY ASKED:
  "What is hoisting in JavaScript?"
  Hoisting is JS's behavior of moving declarations to the top of
  their scope before execution. Function declarations are fully hoisted
  and can be called before they appear. var is hoisted as undefined.
  let and const are hoisted but stay in the Temporal Dead Zone —
  accessing them before their line throws a ReferenceError.
*/

