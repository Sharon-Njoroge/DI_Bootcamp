// Constraint: T must be an array of strings OR an array of numbers
function getArrayLength<T extends string[] | number[]>(items: T): number {
  return items.length;
}

const strLen = getArrayLength(["a", "b", "c"]); // Valid
const numLen = getArrayLength([1, 2, 3, 4]);    // Valid

// const error = getArrayLength([true, false]); // Error: Not assignable