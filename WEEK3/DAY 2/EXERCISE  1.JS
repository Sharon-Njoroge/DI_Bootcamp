<<<<<<< HEAD
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let outcomes = "";

    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            outcomes += i + " ";
            sum += i;
        }
    }
    console.log("Outcome:", outcomes.trim());
    console.log("Sum:", sum);
}

=======
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let outcomes = "";

    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            outcomes += i + " ";
            sum += i;
        }
    }
    console.log("Outcome:", outcomes.trim());
    console.log("Sum:", sum);
}

>>>>>>> 82d3e1755fe372e9b124fe1d640fa3296d675904
displayNumbersDivisible(); // Default 23