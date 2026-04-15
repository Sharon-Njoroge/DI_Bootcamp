// 🌟 Exercise 1: Class with Access Modifiers
class Employee {
    private name: string;
    private salary: number;
    public position: string;
    protected department: string;

    constructor(name: string, salary: number, position: string, department: string) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }

    public getEmployeeInfo(): string {
        return `Employee: ${this.name}, Position: ${this.position}`;
    }
}

// 🌟 Exercise 2: Readonly Properties
class Product {
    readonly id: number;
    public name: string;
    public price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getProductInfo(): string {
        return `Product: ${this.name}, Price: $${this.price}`;
    }
}

// 🌟 Exercise 3: Class Inheritance
class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public makeSound(): string {
        return "Some generic sound";
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    public override makeSound(): string {
        return "bark";
    }
}

// 🌟 Exercise 4: Static Properties and Methods
class Calculator {
    static add(a: number, b: number): number {
        return a + b;
    }

    static subtract(a: number, b: number): number {
        return a - b;
    }
}

// 🌟 Exercise 5: Extending Interfaces
interface User {
    readonly id: number;
    name: string;
    email: string;
}

interface PremiumUser extends User {
    membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
    console.log(`User ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    if (user.membershipLevel) {
        console.log(`Level: ${user.membershipLevel}`);
    }
}

// --- TESTING THE CODE ---

console.log("--- Exercise 1 ---");
const emp = new Employee("Alice", 5000, "Developer", "IT");
console.log(emp.getEmployeeInfo());

console.log("\n--- Exercise 2 ---");
const prod = new Product(1, "Laptop", 1200);
console.log(prod.getProductInfo());
// prod.id = 2; // ❌ UNCOMMENT TO SEE ERROR: Cannot assign to 'id' because it is read-only.

console.log("\n--- Exercise 3 ---");
const myDog = new Dog("Rex");
console.log(`${myDog.name} says: ${myDog.makeSound()}`);

console.log("\n--- Exercise 4 ---");
console.log("Addition: " + Calculator.add(10, 5));
console.log("Subtraction: " + Calculator.subtract(10, 5));

console.log("\n--- Exercise 5 ---");
const vipUser: PremiumUser = {
    id: 99,
    name: "Bob",
    email: "bob@example.com",
    membershipLevel: "Gold"
};
printUserDetails(vipUser);
