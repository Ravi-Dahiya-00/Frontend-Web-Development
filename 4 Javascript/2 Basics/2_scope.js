// ================================================================
// SECTION 2 — 2_scope.js
// TOPIC: Scope — Where Variables Are Accessible
// ================================================================

/*
  SCOPE = the region of code where a variable can be accessed.
  Outside its scope → variable doesn't exist → ReferenceError.

  JS has 3 types of scope:
  1. Global Scope
  2. Function Scope
  3. Block Scope

  You know scope from C++ — the {} block concept is the same.
  The difference is how var, let, const behave differently.
*/


// ================================================================
// 1. GLOBAL SCOPE
// ================================================================

/*
  Variables declared OUTSIDE any function or block.
  Accessible EVERYWHERE in the file.
*/

const globalName = "Ravi";    // global scope

function showName() {
    console.log(globalName);   // accessible inside function ✅
}

showName();                    // Ravi
console.log(globalName);       // Ravi ✅

/*
  In browsers, global variables become properties of the window object:
  var myGlobal = "hi";
  console.log(window.myGlobal);  // "hi"

  AVOID too many global variables:
  → Can be accidentally overwritten
  → Makes code hard to debug
  → Name collisions in large projects
*/


// ================================================================
// 2. FUNCTION SCOPE
// ================================================================

/*
  Variables declared INSIDE a function.
  Only accessible WITHIN that function.
  Outside the function → doesn't exist.

  Same as local variables in C++ functions.
*/

function calculateArea(radius) {
    const pi = 3.14159;       // function-scoped
    const area = pi * radius * radius;
    return area;
}

console.log(calculateArea(5));  // 78.53975
// console.log(pi);             // ❌ ReferenceError: pi is not defined
// console.log(area);           // ❌ ReferenceError: area is not defined


// ================================================================
// 3. BLOCK SCOPE
// ================================================================

/*
  A block is any code inside { } — if, for, while, or just { }.
  let and const are BLOCK SCOPED → only live inside their { } block.
  var is NOT block scoped → leaks out of blocks.

  This is the key reason to use let/const over var.
*/

// let and const — block scoped:
if (true) {
    let blockLet = "I'm inside the block";
    const blockConst = "Me too";
    console.log(blockLet);    // ✅ works inside block
    console.log(blockConst);  // ✅ works inside block
}
// console.log(blockLet);     // ❌ ReferenceError: not defined outside block
// console.log(blockConst);   // ❌ ReferenceError: not defined outside block

// var — NOT block scoped (leaks out):
if (true) {
    var leakyVar = "I leak out!";
}
console.log(leakyVar);  // ✅ "I leak out!" — var escaped the block ❌ (bad!)

// In a loop:
for (let i = 0; i < 3; i++) {
    // i is only accessible here
}
// console.log(i);  // ❌ ReferenceError with let

for (var j = 0; j < 3; j++) {
    // j leaks out
}
console.log(j);   // 3 — var leaked out ❌

/*
  SUMMARY:
  var   → function scoped (ignores blocks)
  let   → block scoped ✅
  const → block scoped ✅
*/


// ================================================================
// 4. LEXICAL SCOPE (Scope Chain)
// ================================================================

/*
  When a function is NESTED inside another function,
  the inner function can access variables from the outer function.
  But NOT the other way around.

  This "looking outward" is called the SCOPE CHAIN.
  JS looks for a variable in the current scope,
  then moves outward to parent scope, then global scope.

  Same concept as C++ nested scopes.
*/

const outerVar = "I am global";

function outer() {
    const outerFnVar = "I am in outer()";

    function inner() {
        const innerVar = "I am in inner()";
        console.log(innerVar);     // ✅ own scope
        console.log(outerFnVar);   // ✅ parent scope (lexical scope)
        console.log(outerVar);     // ✅ global scope
    }

    inner();
    // console.log(innerVar);  // ❌ inner's variables not accessible here
}

outer();

/*
  SCOPE CHAIN lookup order:
  inner() → outer() → global
  JS always searches from inner to outer until it finds the variable.
  If not found anywhere → ReferenceError.
*/
