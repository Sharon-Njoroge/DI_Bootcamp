function castToType<T>(value: any, Constructor: new (arg: any) => T): T {
  return new Constructor(value);
}

// Casting string to Number (the object wrapper)
const num = castToType("42", Number);
console.log(typeof num.valueOf()); // "number"

// Casting string to Boolean
// Note: In JS, Boolean("false") is true because the string is non-empty
const bool = castToType("", Boolean); 
console.log(bool.valueOf()); // false