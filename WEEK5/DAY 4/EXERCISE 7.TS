function formatInput<T extends { toString(): string }>(input: T): string {
  // Use assertion to treat it strictly as a string after calling toString
  const result = (input.toString() as string).trim();
  return `Formatted: ${result}`;
}

console.log(formatInput(123.45));
console.log(formatInput("   TypeScript Rules   "));