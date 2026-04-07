const family = {
    father: "John",
    mother: "Jane",
    son: "Jack"
};

// Log keys
for (let key in family) {
    console.log(key);
}

// Log values
for (let key in family) {
    console.log(family[key]);
}