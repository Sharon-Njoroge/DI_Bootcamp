// Overload signatures
function greet(): string;
function greet(name: string): string;

// Implementation
function greet(name: string = "Guest"): string {
    return `Hello, ${name}!`;
}

console.log(greet());        
console.log(greet("John"));  

