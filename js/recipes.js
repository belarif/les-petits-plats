"use_strict";

function displayRecipesData() {
    const recipeCardElt = document.querySelector(".recipe-cards");
    recipes.forEach((recipe) => {
        const recipeModel = recipeCardsFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipeCardElt.appendChild(recipeDOM);
    });
}

function getIngredients() {
    let ingredients = [];
    recipes.forEach((recipe) => {
        ingredients = [
            ...ingredients,
            ...recipe.ingredients.map((ingredient) => ingredient.ingredient),
          ]; 
    });

    const finalIngredients = new Set (ingredients);
    return Array.from(finalIngredients);
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

function getAppliances() {
    let appliances = [];
    recipes.forEach((recipe) => {
        appliances = appliances.concat(recipe.appliance);
    })

    const finalAppliances = new Set (appliances);
    return Array.from(finalAppliances);
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

function getUtensils() {
    let utensils = [];
    recipes.forEach((recipe) => {
        utensils = [
            ...utensils,
            ...recipe.ustensils,
          ]; 
    });

    const finalUtensils = new Set (utensils);
    return Array.from(finalUtensils);
}

setIngredientsInDropdown();
setAppliancesInDropdown();
displayRecipesData();