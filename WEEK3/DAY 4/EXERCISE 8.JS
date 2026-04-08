function makeJuice(size) {
    const ingredients = [];

    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }

    function displayJuice() {
        const sentence = `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;
        document.body.innerHTML += `<p>${sentence}</p>`;
    }

    // Part II Logic
    addIngredients("Apple", "Ginger", "Lemon");
    addIngredients("Carrot", "Beet", "Kale");
    displayJuice();
}

makeJuice("large");