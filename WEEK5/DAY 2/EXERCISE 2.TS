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
        return `Product: ${this.name} | Price: $${this.price}`;
    }
}

const laptop = new Product(101, "MacBook Pro", 2400;
