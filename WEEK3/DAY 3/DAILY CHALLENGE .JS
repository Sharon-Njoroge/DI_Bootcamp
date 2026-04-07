// 1. Select the elements
const libForm = document.getElementById('libform');
const storySpan = document.getElementById('story');
const shuffleBtn = document.getElementById('shuffle');

// 2. Function to generate the story
const getMadLib = (event) => {
    event.preventDefault();

    // Get values from inputs
    const noun = document.getElementById('noun').value.trim();
    const adj = document.getElementById('adjective').value.trim();
    const person = document.getElementById('person').value.trim();
    const verb = document.getElementById('verb').value.trim();
    const place = document.getElementById('place').value.trim();

    // Check if values are empty
    if (noun === "" || adj === "" || person === "" || verb === "" || place === "") {
        alert("Please fill out all the fields!");
        return;
    }

    // Story options for the shuffle bonus
    const stories = [
        `${person} went to ${place} to find a ${adj} ${noun}. It was a success, they decided to ${verb} all night!`,
        `In the middle of ${place}, ${person} found a ${noun}. It looked so ${adj} that they started to ${verb} immediately.`,
        `Last night, ${person} dreamt of a ${adj} ${place}. In the dream, they grabbed a ${noun} and began to ${verb}.`
    ];

    // Pick a random story from the array
    const randomIndex = Math.floor(Math.random() * stories.length);
    storySpan.textContent = stories[randomIndex];
};

// 3. Event Listeners
libForm.addEventListener('submit', getMadLib);
shuffleBtn.addEventListener('click', getMadLib);