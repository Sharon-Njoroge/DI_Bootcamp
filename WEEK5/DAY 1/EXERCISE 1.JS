const button = document.getElementById('button');
const contentBox = document.getElementById('content-box');

const updateDOM = (name, height, gender, birthYear, homeWorld) => {
    contentBox.innerHTML = `
        <h1>${name}</h1>
        <p>Height: ${height}</p>
        <p>Gender: ${gender}</p>
        <p>Birth Year: ${birthYear}</p>
        <p>Home World: ${homeWorld}</p>
    `;
};

const showLoading = () => {
    contentBox.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin-pulse fa-3x"></i>
        <p>Loading...</p>
    `;
};

const showError = () => {
    contentBox.innerHTML = `<h1>Oh No! That person isn't available.</h1>`;
};

async function getCharacter() {
    showLoading();
    try {
        // SWAPI has 83 people, but IDs aren't always sequential, so we randomize
        const randomId = Math.floor(Math.random() * 83) + 1;
        const response = await fetch(`https://www.swapi.tech/api/people/${randomId}`);
        const data = await response.json();

        if (data.message !== "ok") throw new Error("Character not found");

        const char = data.result.properties;

        // Fetch Homeworld Name (it comes as a URL initially)
        const homeRes = await fetch(char.homeworld);
        const homeData = await homeRes.json();
        const homeName = homeData.result.properties.name;

        updateDOM(char.name, char.height, char.gender, char.birth_year, homeName);
        
    } catch (error) {
        showError();
    }
}

button.addEventListener('click', getCharacter);