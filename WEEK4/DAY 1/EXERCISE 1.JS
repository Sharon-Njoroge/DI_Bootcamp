const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

// Displaying choices
colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

// Checking for "Violet"
colors.includes("Violet") ? console.log("Yeah") : console.log("No...");