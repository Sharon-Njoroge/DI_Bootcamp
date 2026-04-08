// Part I: Alert "Hello World" after 2 seconds
setTimeout(function() {
    alert("Hello World");
}, 2000);

// Part II: Add <p>Hello World</p> after 2 seconds
setTimeout(addParagraph, 2000);

// Part III: Interval & Clearing
const container = document.getElementById("container");
const clearBtn = document.getElementById("clear");

// Function to create and append the paragraph
function addParagraph() {
    const newP = document.createElement("p");
    newP.textContent = "Hello World";
    container.appendChild(newP);

    // Part III logical check: clear if there are 5 paragraphs
    const paragraphs = container.querySelectorAll("p");
    if (paragraphs.length >= 5) {
        clearInterval(timerInterval);
    }
}

// Start interval every 2 seconds
let timerInterval = setInterval(addParagraph, 2000);

// Clear interval when button is clicked
clearBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
});