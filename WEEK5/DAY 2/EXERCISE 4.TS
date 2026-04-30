class Calculator {
    static add(a: number, b: number): number {
        return a + b;
    }

    static subtract(a: number, b: number): number {
        return a - b;
    }
}

// No need to use "new Calculator()"
console.log(Calculator.add(10, 5));      // 15
console.log(Calculator.subtract(20, 8)); // 12