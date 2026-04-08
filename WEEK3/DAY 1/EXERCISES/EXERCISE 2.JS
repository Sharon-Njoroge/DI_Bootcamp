const colors = ["blue", "green", "purple", "black", "silver"];
const suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
    // Bonus logic: use the index to grab the correct suffix
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}