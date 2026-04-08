// #1 
// Prediction: 3. 
// Explanation: 'a' is initialized as 5, then updated to 3 because 5 > 1. 
// #1.2 Prediction: Error. 
// Explanation: 'const' variables cannot be reassigned (a = 3 would fail).

// #2 
// #2.1 Prediction: 
// First alert: 0 (initial value).
// Second alert: 5 (funcTwo modified the global variable 'a').
// #2.2 Prediction: Error. 
// Explanation: funcTwo tries to reassign 'a', which is impossible if 'a' is const.

// #3 
// #3.1 Prediction: "hello". 
// Explanation: funcFour attaches 'a' to the window object, making it a global variable accessible by funcFive.

// #4 
// #4.1 Prediction: "test". 
// Explanation: funcSix declares a local 'a' inside its scope. This "shadows" the global 'a'.
// #4.2 Prediction: "test". 
// Explanation: It still works because the local 'const a' is in a different scope than the global 'let a'.

// #5 
// #5.1 Prediction: 5, then 2. 
// Explanation: Inside the 'if' block, a new 'a' is scoped to that block. Outside, the global 'a' remains 2.
// #5.2 Prediction: 5, then 2. 
// Explanation: 'const' and 'let' share block-scoping rules; the result remains the same.