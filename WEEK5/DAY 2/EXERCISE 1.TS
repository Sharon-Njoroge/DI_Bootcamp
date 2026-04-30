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
        // We can access private properties inside the class
        return `Employee: ${this.name}, Position: ${this.position}`;
    }
}

const emp = new Employee("Alice", 75000, "Software Engineer", "Engineering");
console.log(emp.getEmployeeInfo()); 
// console.log(emp.name); // ❌ Error: Property 'name' is private