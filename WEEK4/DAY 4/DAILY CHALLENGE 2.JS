const morse = `{
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.",
  "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..",
  "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.",
  "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
  "y": "-.--", "z": "--..", ".": ".-.-.-", ",": "--..--", "?": "..--..",
  "!": "-.-.--", "-": "-....-", "/": "-..-.", "@": ".--.-.", "(": "-.--.", ")": "-.--.-"
}`;

// 1. Convert JSON to Object
const toJs = () => {
  return new Promise((resolve, reject) => {
    const morseJS = JSON.parse(morse);
    if (Object.keys(morseJS).length === 0) {
      reject("Error: The Morse object is empty.");
    } else {
      resolve(morseJS);
    }
  });
};

// 2. Translate user input to Morse array
const toMorse = (morseJS) => {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Enter a word or sentence:").toLowerCase();
    const wordsArray = userInput.replace(/\s/g, "").split(""); // Basic version: ignore spaces
    const translation = [];

    for (const char of wordsArray) {
      if (morseJS[char]) {
        translation.push(morseJS[char]);
      } else {
        reject(`Error: Character "${char}" does not exist in Morse library.`);
        return; // Exit loop and function
      }
    }
    resolve(translation);
  });
};

// 3. Display translation on DOM
const joinWords = (morseTranslation) => {
  const container = document.body;
  const p = document.createElement("p");
  // Join by line break as requested
  p.innerHTML = morseTranslation.join("<br>");
  container.appendChild(p);
  console.log("Translation complete!");
};

// --- Chaining the execution ---
toJs()
  .then((morseJS) => toMorse(morseJS))
  .then((translation) => joinWords(translation))
  .catch((error) => console.error(error));