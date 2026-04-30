interface User {
  name: string;
  email: string;
}

interface Admin {
  adminLevel: number;
}

// Intersection Type
type AdminUser = User & Admin;

function getProperty(obj: AdminUser, key: string) {
  // Type guard using the 'in' operator
  if (key in obj) {
    return (obj as any)[key];
  }
  return undefined;
}

// Example Usage:
const powerUser: AdminUser = {
  name: "Alice",
  email: "alice@example.com",
  adminLevel: 1
};

console.log(getProperty(powerUser, "adminLevel")); // 1
console.log(getProperty(powerUser, "phone"));      // undefined