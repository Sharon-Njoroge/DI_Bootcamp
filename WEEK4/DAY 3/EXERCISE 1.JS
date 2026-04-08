// Exercise 3: JSON Mario
const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      bowser : {
        description: "Big and green, Hates princesses.",
        height: 16,
        weight: 6,
        speed: 4,
      },
      princessPeach : {
        description: "Beautiful princess.",
        height: 12,
        weight: 2,
        speed: 2,
      }
  },
}

// 1. Convert to JSON string
const marioJSON = JSON.stringify(marioGame);
console.log("Standard JSON:", marioJSON);

// 2. Convert and Pretty Print
const marioPretty = JSON.stringify(marioGame, null, 2);
console.log("Pretty Printed JSON:\n", marioPretty);

// 3. Debugger (The browser will pause here if DevTools is open)
debugger;