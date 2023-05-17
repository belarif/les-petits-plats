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

/**
 * 
 * @returns {object}
 */
function getNames() {
    let names = [];
    recipes.forEach((recipe) => {
        names = names.concat(recipe.name);
    })

    return Array.from(new Set (names));
}

/**
 * 
 * @returns {object}
 */
function getDescriptions() {
    let descriptions = [];
    recipes.forEach((recipe) => {
        descriptions = descriptions.concat(recipe.description);
    })

    return Array.from(new Set (descriptions));
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
        
        const ingredientLiElt = document.createElement("li");
        ingredientLiElt.textContent = ingredient;
        ingredientUlElt.appendChild(ingredientLiElt);
    })
}

const ingredientUlElt = document.querySelector(".ingredient .dropdown-ul");

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
