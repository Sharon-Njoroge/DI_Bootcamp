const makeAllCaps = (words) => {
  return new Promise((resolve, reject) => {
    // Check if every element in the array is a string
    const areAllStrings = words.every((word) => typeof word === "string");

    if (areAllStrings) {
      resolve(words.map((word) => word.toUpperCase()));
    } else {
      reject("Error: Not all items in the array are strings.");
    }
  });
};

const sortWords = (uppercasedWords) => {
  return new Promise((resolve, reject) => {
    if (uppercasedWords.length > 4) {
      // .sort() modifies the original array, but it's safe here 
      // as it's the final step in our chain
      resolve([...uppercasedWords].sort());
    } else {
      reject("Error: The array length is 4 or less.");
    }
  });
};

// --- Test Cases ---

// 1. Fails at makeAllCaps (contains a number)
makeAllCaps([1, "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log("Test 1:", result))
  .catch((error) => console.log("Test 1 Catch:", error));

// 2. Fails at sortWords (length is 3)
makeAllCaps(["apple", "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log("Test 2:", result))
  .catch((error) => console.log("Test 2 Catch:", error));

// 3. Succeeds (all strings, length 5)
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log("Test 3 Success:", result))
  .catch((error) => console.log("Test 3 Catch:", error));