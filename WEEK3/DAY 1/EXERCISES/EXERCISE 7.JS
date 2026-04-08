const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// 1. Get first letters, 2. Sort them, 3. Join into a string
let acronym = names.map(name => name[0]).sort().join("");

console.log(acronym); // Output: ABJKPS