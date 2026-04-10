// --- Exercise 3: Resolve ---
const resolvePromise = Promise.resolve(3);
resolvePromise.then(val => console.log("Exercise 3.1:", val));

// --- Exercise 3: Reject ---
const rejectPromise = Promise.reject("Boo!");
rejectPromise.catch(err => console.log("Exercise 3.2:", err));