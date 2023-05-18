"use_strict";

// DOM elements
const ingredientUlElt = document.querySelector(".ingredient .dropdown-ul");
const applianceUlElt = document.querySelector(".appliance .dropdown-ul");
const utensilUlElt = document.querySelector(".utensil .dropdown-ul");

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

function setAppliancesInDropdown() {
    const appliances = getAppliances();
    appliances.forEach(appliance => {
        const applianceLiElt = document.createElement("li");
        applianceLiElt.textContent = appliance;
        applianceUlElt.appendChild(applianceLiElt);
    })
}

function setUtensilsInDropdown() {
    const utensils = getUtensils();
    utensils.forEach(utensil => {
        const utensilLiElt = document.createElement("li");
        utensilLiElt.textContent = utensil;
        utensilUlElt.appendChild(utensilLiElt);
    })
}

/**
 * 
 * @param {string} searchValue 
 * @returns {object}
 */
function searchInIngredients(searchValue) {
    const ingredients = getIngredients();
    let searchedIngredients = [];

    ingredients.forEach(ingredient => {
        let regex = new RegExp(searchValue, "ig");
        let search = ingredient.match(regex);
        
        if (search) {
            searchedIngredients.unshift(ingredient);
        }
    });

    return searchedIngredients;
}

/**
 * 
 * @param {string} searchValue 
 * @returns {object}
 */
function seachInNames(searchValue) {
    const names = getNames();
    let searchedNames = [];
    names.forEach(name => {
        let regex = new RegExp(searchValue, "ig");
        let search = name.match(regex);
        
        if (search) {
            searchedNames.unshift(name);
        }
    });

    return searchedNames;
}

/**
 * 
 * @param {string} searchValue 
 * @returns {object}
 */
function searchInDescriptions(searchValue) {
    const descriptions = getDescriptions();
    let searchedDescriptions = [];
    descriptions.forEach(description => {
        let regex = new RegExp(searchValue, "ig");
        let search = description.match(regex);
        
        if (search) {
            searchedDescriptions.unshift(description);
        }
    });

    return searchedDescriptions;
}

/**
 * 
 * @param {string} searchValue 
 * @returns {object}
 */
function getRecipesByName(searchValue) {
    const searchedNames = seachInNames(searchValue);
    let recipesByName = [];

    searchedNames.forEach(name => {
        const recipeByName = recipes.filter((recipe) => { 
            return recipe.name === name;
        });
        recipesByName = recipesByName.concat(recipeByName);
    });

    return recipesByName;
}

/**
 * 
 * @param {string} searchValue 
 * @returns {object}
 */
function getRecipesByDescription(searchValue) {
    const searchedDescriptions = searchInDescriptions(searchValue);
    let recipesByDescription = [];

    searchedDescriptions.forEach(description => {
        const recipeByDescription = recipes.filter((recipe) => { 
            return recipe.description === description;
        });
        recipesByDescription = recipesByDescription.concat(recipeByDescription);
    });

    return recipesByDescription;
}

function searchRecipeInMainBar() {
    const mainSearch = document.querySelector(".main-search");
    mainSearch.addEventListener("keyup", (e) => {
        let searchValue = e.target.value;
        
        if (searchValue.length >= 3) {
            getRecipesByName(searchValue);
            getRecipesByDescription(searchValue);

            ingredientUlElt.innerHTML = "";
            applianceUlElt.innerHTML = "";
            utensilUlElt.innerHTML = "";
        }
    });
}

searchRecipeInMainBar();
displayRecipesData();
setIngredientsInDropdown();
setAppliancesInDropdown();
setUtensilsInDropdown();
