// Function Declaration
function convertToGrams(kg) {
    return kg * 1000;
}
convertToGrams(2);

// Function Expression
const kgToGrams = function(kg) {
    return kg * 1000;
};
kgToGrams(2);

// Difference: Function declarations are hoisted (can be called before defined), while expressions are not.

// One-line Arrow Function
const arrowKgToGrams = kg => kg * 1000;
arrowKgToGrams(2);