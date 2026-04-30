async function getStarship() {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const objectStarWars = await response.json();
    console.log("Exercise 3 Result:", objectStarWars.result);
  } catch (error) {
    console.error("Could not fetch starship data:", error);
  }
}

getStarship();