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

/**
 * 
 * @param {object} searchedRecipes 
 * @returns {object}
 */
function getUpdatedIngredients(searchedRecipes) {
    let updatedIngredients = [];

    searchedRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            updatedIngredients = updatedIngredients.concat(ingredient.ingredient);
        })
    });

    return Array.from (new Set (updatedIngredients));
}

function setIngredientsInDropdown() {
    const ingredients = getIngredients();
    displayItemsDropdown(ingredients, ingredientUlElt);
}

function filterByIngredients() {
    const ingredientsSearchElt = document.querySelector(".ingredient .search");

    ingredientsSearchElt.addEventListener("keyup", (e) => {
        let keywordIngredient = e.target.value;
        let searchedIngredients = [];
        const searchedRecipes = getRecipesByNameDescriptionAndIngredient(keywordIngredient);
        const updatedIngredients = getUpdatedIngredients(searchedRecipes);
        
        filterByDropdown(updatedIngredients, searchedIngredients, keywordIngredient);

        if (keywordIngredient.length >= 3) {
            ingredientUlElt.innerHTML = "";
            displayItemsDropdown(searchedIngredients, ingredientUlElt); 
        } else {
            ingredientUlElt.innerHTML = "";
            displayItemsDropdown(updatedIngredients, ingredientUlElt);
        }

        displayIngredientTag();
    });
}

function displayIngredientTag() {
    const ingredientsLiElt = document.querySelectorAll(".ingredient .dropdown-ul li");
   
    ingredientsLiElt.forEach(ingredientLiElt => {
        ingredientLiElt.addEventListener("click", (e) => {
            ingredientLiElt.style.display = "none";
            const buttonType = "btn btn-primary";
            const dropdownItem = "ingredient";

            createTagBtn(ingredientLiElt, buttonType, dropdownItem);
            closeIngredientTag();
        });
    });
}

function closeIngredientTag() {
    const ingredientTagElts = document.querySelectorAll(".ingredient-tag");
    ingredientTagElts.forEach(ingredientTagElt => {
        const closeIngredientTagElt = ingredientTagElt.childNodes[1];

        closeIngredientTagElt.addEventListener("click", () => {
            ingredientTagElt.remove();
        })
    });
}

