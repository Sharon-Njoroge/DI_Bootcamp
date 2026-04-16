type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

// Combine types using &
type PersonWithAddress = Person & Address;

const user: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "123 TypeScript Lane",
  city: "Codersville"
};