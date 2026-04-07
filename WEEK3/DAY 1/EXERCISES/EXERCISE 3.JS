let num;

// A 'do...while' loop is most relevant because we need to ask at least once
do {
    num = prompt("Please enter a number:");
    num = Number(num); // Convert string to number
} while (num < 10);