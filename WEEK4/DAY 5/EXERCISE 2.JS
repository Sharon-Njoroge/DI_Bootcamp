const query = "sun";
const limit = 10;
const offset = 2;
const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const searchUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=${limit}&offset=${offset}&api_key=${apiKey}`;

fetch(searchUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Exercise 2 Data (10 Sun GIFs):", data);
  })
  .catch((error) => {
    console.error("Error in Exercise 2:", error);
  });