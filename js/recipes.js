"use_strict";

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
 * @returns {object}
 */
function getAppliances() {
    let appliances = [];
    recipes.forEach((recipe) => {
        appliances = appliances.concat(recipe.appliance);
    })

    return Array.from(new Set (appliances));
}

/**
 * 
 * @returns {object}
 */
function getUtensils() {
    let utensils = [];
    recipes.forEach((recipe) => {
        utensils = [
            ...utensils,
            ...recipe.ustensils,
          ]; 
    });

    return Array.from(new Set (utensils));
}

function displayRecipesData() {
    const recipeCardElt = document.querySelector(".recipe-cards");
    recipes.forEach((recipe) => {
        const recipeModel = recipeCardsFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipeCardElt.appendChild(recipeDOM);
    });
}

function setIngredientsInDropdown() {
    const ingredients = getIngredients();
    ingredients.forEach(ingredient => {
        const ingredientUlElt = document.querySelector(".ingredient .dropdown-ul");
        const ingredientLiElt = document.createElement("li");
        ingredientLiElt.textContent = ingredient;
        ingredientUlElt.appendChild(ingredientLiElt);
    })
}

function setAppliancesInDropdown() {
    const appliances = getAppliances();
    appliances.forEach(appliance => {
        const applianceUlElt = document.querySelector(".appliance .dropdown-ul");
        const applianceLiElt = document.createElement("li");
        applianceLiElt.textContent = appliance;
        applianceUlElt.appendChild(applianceLiElt);
    })
}

function setUtensilsInDropdown() {
    const utensils = getUtensils();
    utensils.forEach(utensil => {
        const utensilUlElt = document.querySelector(".utensil .dropdown-ul");
        const utensilLiElt = document.createElement("li");
        utensilLiElt.textContent = utensil;
        utensilUlElt.appendChild(utensilLiElt);
    })
}

displayRecipesData();
setIngredientsInDropdown();
setAppliancesInDropdown();
setUtensilsInDropdown();
