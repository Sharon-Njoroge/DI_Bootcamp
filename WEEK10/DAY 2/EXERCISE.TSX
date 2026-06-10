import { v4 as uuidv4 } from 'uuid';

// ==========================================
// 1. RecipeItem (Model)
// ==========================================
export interface IRecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

export class RecipeItem implements IRecipeItem {
  public id: string;
  public isFavorite: boolean;

  constructor(
    public title: string,
    public ingredients: string[],
    public instructions: string,
    id: string = uuidv4(),
    isFavorite: boolean = false
  ) {
    this.id = id;
    this.isFavorite = isFavorite;
  }
}

// ==========================================
// 2. RecipeCollection (Controller/State)
// ==========================================
export class RecipeCollection {
  private recipes: RecipeItem[] = [];
  private readonly STORAGE_KEY = 'recipe_book_app';

  constructor() {
    this.loadFromLocalStorage();
  }

  public get allRecipes(): RecipeItem[] {
    return this.recipes;
  }

  public addRecipe(title: string, ingredients: string[], instructions: string): void {
    const newRecipe = new RecipeItem(title, ingredients, instructions);
    this.recipes.push(newRecipe);
    this.saveToLocalStorage();
  }

  public removeRecipe(id: string): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveToLocalStorage();
  }

  public toggleFavorite(id: string): void {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.saveToLocalStorage();
    }
  }

  public clearAll(): void {
    this.recipes = [];
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recipes));
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as any[];
        this.recipes = parsed.map(
          item => new RecipeItem(item.title, item.ingredients, item.instructions, item.id, item.isFavorite)
        );
      } catch (e) {
        console.error("Failed to parse recipes from localStorage", e);
        this.recipes = [];
      }
    }
  }
}

// ==========================================
// 3. RecipeTemplate (DOM View View)
// ==========================================
export class RecipeTemplate {
  private container: HTMLDivElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLDivElement;
    if (!this.container) {
      throw new Error(`Container element with id '${containerId}' not found.`);
    }
  }

  public render(collection: RecipeCollection): void {
    this.container.innerHTML = ''; // Clear previous content

    if (collection.allRecipes.length === 0) {
      this.container.innerHTML = '<p class="empty-message">No recipes added yet!</p>';
      return;
    }

    collection.allRecipes.forEach(recipe => {
      // Create main card wrapper
      const card = document.createElement('div');
      card.className = `recipe-card ${recipe.isFavorite ? 'favorite' : ''}`;

      // Card Header (Always visible)
      const header = document.createElement('div');
      header.className = 'recipe-header';
      header.innerHTML = `
        <h3>${recipe.title} ${recipe.isFavorite ? '⭐' : ''}</h3>
        <button class="toggle-details-btn">Show Details</button>
      `;

      // Card Body (Collapsible)
      const body = document.createElement('div');
      body.className = 'recipe-body hidden'; // Hidden by default
      
      const ingredientsList = recipe.ingredients
        .map(ing => `<li>${ing}</li>`)
        .join('');

      body.innerHTML = `
        <h4>Ingredients:</h4>
        <ul>${ingredientsList}</ul>
        <h4>Instructions:</h4>
        <p>${recipe.instructions}</p>
        <div class="card-actions">
          <button class="fav-btn">${recipe.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      // --- Interaction Setup ---
      const toggleBtn = header.querySelector('.toggle-details-btn') as HTMLButtonElement;
      toggleBtn.addEventListener('click', () => {
        const isHidden = body.classList.toggle('hidden');
        toggleBtn.textContent = isHidden ? 'Show Details' : 'Hide Details';
      });

      const favBtn = body.querySelector('.fav-btn') as HTMLButtonElement;
      favBtn.addEventListener('click', () => {
        collection.toggleFavorite(recipe.id);
        this.render(collection);
      });

      const deleteBtn = body.querySelector('.delete-btn') as HTMLButtonElement;
      deleteBtn.addEventListener('click', () => {
        collection.removeRecipe(recipe.id);
        this.render(collection);
      });

      card.appendChild(header);
      card.appendChild(body);
      this.container.appendChild(card);
    });
  }
}

// ==========================================
// 4. Application Bootstrap (Main Execution)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const recipeCollection = new RecipeCollection();
  const recipeTemplate = new RecipeTemplate('recipeContainer');

  const recipeForm = document.getElementById('recipeEntryForm') as HTMLFormElement;
  const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
  const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
  const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;
  const clearAllBtn = document.getElementById('clearRecipesButton') as HTMLButtonElement;

  // Form Submission
  recipeForm?.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const ingredients = ingredientsInput.value
      .split('\n')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0);
    const instructions = instructionsInput.value.trim();

    if (title && ingredients.length > 0 && instructions) {
      recipeCollection.addRecipe(title, ingredients, instructions);
      recipeTemplate.render(recipeCollection);
      recipeForm.reset();
    }
  });

  // Clear App Collection
  clearAllBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all recipes?')) {
      recipeCollection.clearAll();
      recipeTemplate.render(recipeCollection);
    }
  });

  // Initial Paint
  recipeTemplate.render(recipeCollection);
});