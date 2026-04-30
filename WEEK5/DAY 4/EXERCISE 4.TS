function getFirstElement(arr: (number | string)[]): string {
  // Asserting that the first element is a string
  return arr[0] as string;
}

const mixedArray = ["First", 2, "Third"];
console.log(getFirstElement(mixedArray)); 