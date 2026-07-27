// ================================================================
// SECTION 4 — 4_closures.js
// TOPIC: Closures
// ================================================================

/*
  WHAT IS A CLOSURE?
  ==================
  A closure is a function that REMEMBERS the variables from
  its OUTER scope even after that outer function has finished executing.

  This does NOT exist in C++. It's one of the most unique and
  powerful features of JavaScript.

  Simple definition:
  → Inner function + the variables it "closes over" from outer scope
  → The inner function carries a "backpack" of outer variables with it

  INTERVIEW TIP — closures are asked in almost every JS interview.
*/


// ================================================================
// BASIC CLOSURE EXAMPLE
// ================================================================

function outer() {
    const message = "Hello from outer!";  // outer variable

    function inner() {
        console.log(message);  // inner function CLOSES OVER 'message'
    }

    return inner;  // returning the function itself (not calling it)
}

const myFunc = outer();   // outer() runs and finishes
                          // normally 'message' would be gone
myFunc();  // "Hello from outer!" — but inner() still remembers 'message' ✅

/*
  What happened:
  1. outer() ran and returned inner function
  2. outer() finished — normally its variables are garbage collected
  3. But inner() HOLDS A REFERENCE to 'message'
  4. So 'message' stays alive in memory as long as inner() exists
  5. When myFunc() is called, it still has access to 'message'

  The inner function "closed over" the outer function's scope.
  That's why it's called a CLOSURE.
*/


// ================================================================
// REAL-WORLD USE 1: COUNTER (most classic closure example)
// ================================================================

function makeCounter() {
    let count = 0;    // private variable — can't be accessed from outside

    return {
        increment: () => {
            count++;
            console.log(`Count: ${count}`);
        },
        decrement: () => {
            count--;
            console.log(`Count: ${count}`);
        },
        getCount: () => count
    };
}

const counter = makeCounter();
counter.increment();   // Count: 1
counter.increment();   // Count: 2
counter.increment();   // Count: 3
counter.decrement();   // Count: 2
console.log(counter.getCount());  // 2

// console.log(count);  // ❌ ReferenceError — count is private!

// Create a SECOND counter — it has its OWN separate count:
const counter2 = makeCounter();
counter2.increment();  // Count: 1 (independent of counter)

/*
  This is POWERFUL:
  → count is "private" — can't be touched from outside
  → Only the returned functions can modify it
  → counter and counter2 have completely separate count values
  → This is like a private variable in C++ class, but without a class!

  This is one of the main uses of closures:
  DATA PRIVACY — hiding variables from the outside world.
*/


// ================================================================
// REAL-WORLD USE 2: FUNCTION FACTORY
// ================================================================

/*
  Closures let you create functions with PRE-SET arguments.
  You "partially apply" a function with one value, get back a new function.
*/

function multiplyBy(factor) {
    return (number) => number * factor;  // closes over 'factor'
}

const double = multiplyBy(2);
const triple = multiplyBy(3);
const tenTimes = multiplyBy(10);

console.log(double(5));    // 10  — factor=2 is remembered
console.log(triple(5));    // 15  — factor=3 is remembered
console.log(tenTimes(5));  // 50  — factor=10 is remembered

/*
  Each call to multiplyBy() creates a NEW closure with its own 'factor'.
  double, triple, tenTimes are all separate functions with their own closed-over value.
*/


// ================================================================
// REAL-WORLD USE 3: REMEMBERING STATE
// ================================================================

function makeGreeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHi = makeGreeter("Hi");
const sayGoodMorning = makeGreeter("Good Morning");

console.log(sayHi("Ravi"));            // Hi, Ravi!
console.log(sayHi("Raj"));             // Hi, Raj!
console.log(sayGoodMorning("Priya"));  // Good Morning, Priya!

/*
  KEY CLOSURE POINTS FOR INTERVIEW:
  → A closure gives inner functions access to outer scope variables
  → Variables in closures stay alive as long as the inner function exists
  → Each call to the outer function creates a NEW, independent closure
  → Used for: data privacy, function factories, memoization, event handlers
*/

