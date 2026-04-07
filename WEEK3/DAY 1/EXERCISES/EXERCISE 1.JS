const people = ["Greg", "Mary", "Devon", "James"];

// --- Part I: Array Review ---

// 1. Remove "Greg"
people.shift(); 

// 2. Replace "James" with "Jason"
people[people.indexOf("James")] = "Jason";

// 3. Add your name to the end
people.push("Gemini");

// 4. Console.log Mary's index
console.log(people.indexOf("Mary")); // Output: 0

// 5. Copy using slice (Excluding "Mary" and "Gemini")
// Current array: ["Mary", "Devon", "Jason", "Gemini"]
const newPeople = people.slice(1, 3); 
console.log(newPeople); // ["Devon", "Jason"]

// 6. Index of "Foo"
console.log(people.indexOf("Foo")); 
// Why -1? Because "Foo" does not exist in the array. 
// indexOf returns -1 whenever the element is not found.

// 7. Variable "last"
let last = people[people.length - 1];
// Relationship: The last index is always array.length - 1 because arrays are zero-indexed.

// --- Part II: Loops ---

// 1. Iterate and log everyone
for (let person of people) {
    console.log(person);
}

// 2. Exit after logging "Devon"
for (let person of people) {
    console.log(person);
    if (person === "Devon") {
        break;
    }
}