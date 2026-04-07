const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
    let i = index + 1;
    // If i is 1, 2, or 3 use corresponding ordinal, otherwise use "th"
    let suffix = (i <= 3) ? ordinal[i] : ordinal[0];
    console.log(`${i}${suffix} choice is ${color}.`);
});