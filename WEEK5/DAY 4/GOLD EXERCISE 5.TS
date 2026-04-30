interface Item<T> {
  value: T;
}

class Queue<T> {
  private collection: Item<T>[] = [];

  add(item: Item<T>): void {
    this.collection.push(item);
  }

  remove(): Item<T> | undefined {
    return this.collection.shift();
  }
}

// Example: Queue of numbers
const todoQueue = new Queue<number>();
todoQueue.add({ value: 101 });
todoQueue.add({ value: 102 });

console.log(todoQueue.remove()?.value); // 101

// Example: Queue of objects
const userQueue = new Queue<{ username: string }>();
userQueue.add({ value: { username: "dev_guy" } });