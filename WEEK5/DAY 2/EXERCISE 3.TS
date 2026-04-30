class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public makeSound(): string {
        return "Some generic animal sound";
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name); // Must call super() to initialize the parent class
    }

    // Overriding the method
    public makeSound(): string {
        return "Bark";
    }
}

const myDog = new Dog("Buddy");
console.log(`${myDog.name} says: ${myDog.makeSound()}`); 