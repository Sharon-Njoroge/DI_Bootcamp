// 1. Define the types
type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

// Create a Union type for the array
type DataItem = User | Product | Order;

/**
 * 2. Processes an array of mixed types using type guards.
 */
function handleData(data: DataItem[]): string[] {
  return data.map((item) => {
    // Implementing type guards based on the 'type' property
    switch (item.type) {
      case 'user':
        // TypeScript knows 'item' is User here
        return `Hello, ${item.name}! You are ${item.age} years old.`;

      case 'product':
        // TypeScript knows 'item' is Product here
        return `Product ID: ${item.id} is priced at $${item.price}.`;

      case 'order':
        // TypeScript knows 'item' is Order here
        return `Order ${item.orderId} total: $${item.amount}.`;

      default:
        // 3. Handling unexpected cases gracefully
        return "Unknown data type encountered.";
    }
  });
}

// --- Example Usage ---
const mixedData: DataItem[] = [
  { type: 'user', name: 'Alice', age: 30 },
  { type: 'product', id: 101, price: 29.99 },
  { type: 'order', orderId: 'ABC-123', amount: 150.50 }
];

console.log(handleData(mixedData));