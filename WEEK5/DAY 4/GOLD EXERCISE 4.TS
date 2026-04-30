interface StorageInterface<T> {
  add(item: T): void;
  get(index: number): T | undefined;
}

class Box<T> implements StorageInterface<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

// Testing with different types
const stringBox = new Box<string>();
stringBox.add("TypeScript");
console.log(stringBox.get(0)); // "TypeScript"

const numberBox = new Box<number>();
numberBox.add(100);