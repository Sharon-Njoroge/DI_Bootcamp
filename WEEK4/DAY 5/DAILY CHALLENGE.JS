const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const container = document.getElementById('gif-container');
const deleteAllBtn = document.getElementById('delete-all');

// 1. Function to Fetch GIF
const fetchGif = async (category) => {
    try {
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${category}`;
        const response = await fetch(url);
        const result = await response.json();

        // Extract the fixed_height URL from the images object
        const gifUrl = result.data.images.fixed_height.url;
        
        appendGif(gifUrl);
    } catch (error) {
        console.error("Error fetching data from Giphy:", error);
        alert("Failed to fetch GIF. Try another category!");
    }
};

// 2. Function to Append GIF and Delete Button to DOM
const appendGif = (url) => {
    const div = document.createElement('div');
    div.classList.add('gif-item');

    const img = document.createElement('img');
    img.src = url;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'DELETE';
    
    // Individual Delete Logic
    deleteBtn.addEventListener('click', () => {
        div.remove();
    });

    div.appendChild(img);
    div.appendChild(deleteBtn);
    container.appendChild(div);
};

// 3. Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = input.value.trim();
    if (category) {
        fetchGif(category);
        input.value = ''; // Clear input after search
    }
});

deleteAllBtn.addEventListener('click', () => {
    container.innerHTML = '';
});