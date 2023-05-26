"use_strict";

// DOM elements
const ingredientTagElt = document.querySelector(".ingredient-tag");

/**
 * 
 * @returns {object}
 */
function getIngredients() {
    let ingredients = [];
    recipes.forEach((recipe) => {
        ingredients = [
            ...ingredients,
            ...recipe.ingredients.map((ingredient) => ingredient.ingredient),
          ]; 
    });

    return Array.from(new Set (ingredients));
}

function setIngredientsInDropdown() {
    const ingredients = getIngredients();
    displayIngredients(ingredients);
}

/**
 * 
 * @param {object} ingredients 
 */
function displayIngredients(ingredients) {
    ingredients.forEach(ingredient => {
        const ingredientLiElt = document.createElement("li");
        ingredientLiElt.textContent = ingredient;
        ingredientUlElt.appendChild(ingredientLiElt);
    })
}

/**
 * 
 * @param {object} updatedIngredients 
 */
function filterByIngredients(updatedIngredients) {
    const ingredientsSearchElt = document.querySelector(".ingredient .search");

    ingredientsSearchElt.addEventListener("keyup", (e) => {
        let keywordIngredient = e.target.value;
        let searchedIngredients = [];

        filterByDropdown(updatedIngredients, searchedIngredients, keywordIngredient);

        if (keywordIngredient.length >= 3) {
            ingredientUlElt.innerHTML = "";
            displayIngredients(searchedIngredients); 
        } else {
            ingredientUlElt.innerHTML = "";
            displayIngredients(updatedIngredients);
        }
    });
}

function displayIngredientTag() {
    const ingredientsLiElt = document.querySelectorAll(".ingredient .dropdown-ul li");

    ingredientsLiElt.forEach(ingredientLiElt => {
        ingredientLiElt.addEventListener("click", (e) => {
            const buttonTagElt = document.querySelector(".ingredient-tag button");
            buttonTagElt.textContent = ingredientLiElt.textContent;
            ingredientTagElt.style.display = "block";

            refreshIngredientsDropdownAndRecipesSection(e);
        });
    });
}

function refreshIngredientsDropdownAndRecipesSection(e) {
    const ingredientTag = e.target.textContent;
    const recipesByIngredients = getRecipesByIngredient(ingredientTag);
    let searchedRecipes = [];
    
    searchedRecipes = searchedRecipes.concat(recipesByIngredients);  //.concat(recipesByNames).concat(recipesByDescriptions)
    searchedRecipes = Array.from (new Set (searchedRecipes));

    rowCardElt.innerHTML = "";
    displayRecipes(searchedRecipes);

    ingredientUlElt.innerHTML = "";
    const updatedIngredients = getUpdatedIngredients(searchedRecipes);

    displayIngredients(updatedIngredients);
    // filterByIngredients(updatedIngredients);
}

function closeIngredientTag() {
    const closeIngredientTagElt = document.querySelector(".ingredient-tag .badge");
    closeIngredientTagElt.addEventListener("click", () => {
        ingredientTagElt.style.display = "none";
        displayRecipesData();
        setIngredientsInDropdown();
    })
}

displayIngredientTag();
closeIngredientTag();
setIngredientsInDropdown();
