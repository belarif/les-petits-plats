"use_strict";

// DOM elements
const ingredientUlElt = document.querySelector(".ingredient .dropdown-ul");
const applianceUlElt = document.querySelector(".appliance .dropdown-ul");
const utensilUlElt = document.querySelector(".utensil .dropdown-ul");
const rowCardElt = document.querySelector(".row-card");
const recipeCardElt = document.querySelector(".recipe-cards");

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
    const allRecipes = recipes;
    displayRecipes(allRecipes);
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

function setAppliancesInDropdown() {
    const appliances = getAppliances();
    
}

/**
 * 
 * @param {object} appliances
 */
function displayAppliances(appliances) {
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
 * @param {string} keyword 
 * @returns {object}
 */
function searchInIngredients(keyword) {
    const ingredients = getIngredients();
    let searchedIngredients = [];

    ingredients.forEach(ingredient => {
        let regex = new RegExp(keyword, "ig");
        let search = ingredient.match(regex);
        
        if (search) {
            searchedIngredients.unshift(ingredient);
            
        }
    });

    return searchedIngredients;
}

/**
 * 
 * @param {string} keyword 
 * @returns {object}
 */
function seachInNames(keyword) {
    const names = getNames();
    let searchedNames = [];
    names.forEach(name => {
        let regex = new RegExp(keyword, "ig");
        let search = name.match(regex);
        
        if (search) {
            searchedNames.unshift(name);
        }
    });

    return searchedNames;
}

/**
 * 
 * @param {string} keyword 
 * @returns {object}
 */
function searchInDescriptions(keyword) {
    const descriptions = getDescriptions();
    let searchedDescriptions = [];
    descriptions.forEach(description => {
        let regex = new RegExp(keyword, "ig");
        let search = description.match(regex);
        
        if (search) {
            searchedDescriptions.unshift(description);
        }
    });

    return searchedDescriptions;
}

/**
 * 
 * @param {string} keyword 
 * @returns {object}
 */
function getRecipesByName(keyword) {
    const searchedNames = seachInNames(keyword);
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
 * @param {string} keyword 
 * @returns {object}
 */
function getRecipesByDescription(keyword) {
    const searchedDescriptions = searchInDescriptions(keyword);
    let recipesByDescription = [];

    searchedDescriptions.forEach(description => {
        const recipeByDescription = recipes.filter((recipe) => { 
            return recipe.description === description;
        });
        recipesByDescription = recipesByDescription.concat(recipeByDescription);
    });

    return recipesByDescription;
}

function getRecipesByIngredient(keyword) {
    const searchedIngredients = searchInIngredients(keyword);
    const recipeByIngredient = recipes.filter((recipe) => { 
        
        let result = false;
        recipe.ingredients.forEach(ingredient => {
            const r = searchedIngredients.includes(ingredient.ingredient);
            if(r) {
                result = true;
            }
        });
        
        return result;
    });
       
    return recipeByIngredient;
}

/**
 * 
 * @param {object} recipes 
 * @returns {object}
 */
function orderRecipesByName(recipes) {

    return recipes.sort(function(a,b) { 
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    });
}

function displayRecipes(recipes) {
    const recipesOrderedByName = orderRecipesByName(recipes);

    recipesOrderedByName.forEach((recipe) => {
        const recipeModel = recipeCardsFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipeCardElt.appendChild(recipeDOM);
    });
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

/**
 * 
 * @param {object} searchedRecipes 
 * @returns {object}
 */
function getUpdatedAppliances(searchedRecipes) {
    let updatedAppliances = [];
    searchedRecipes.forEach(recipe => {
        updatedAppliances = updatedAppliances.concat(recipe.appliance);
    });

    return Array.from (new Set (updatedAppliances));
}

function searchRecipeInMainBar() {
    const mainSearch = document.querySelector(".main-search");
    mainSearch.addEventListener("keyup", (e) => {
        let keyword = e.target.value;
        
        if (keyword.length >= 3) {
            const recipesByNames = getRecipesByName(keyword);
            const recipesByDescriptions = getRecipesByDescription(keyword);
            const recipesByIngredients = getRecipesByIngredient(keyword);

            let searchedRecipes = [];
            searchedRecipes = searchedRecipes.concat(recipesByNames).concat(recipesByDescriptions).concat(recipesByIngredients);
            searchedRecipes = Array.from (new Set (searchedRecipes));

            
            rowCardElt.innerHTML = "";
            displayRecipes(searchedRecipes);

            ingredientUlElt.innerHTML = "";
            const updatedIngredients = getUpdatedIngredients(searchedRecipes);
            displayIngredients(updatedIngredients);

            applianceUlElt.innerHTML = "";
            const updatedApplicances = getUpdatedAppliances(searchedRecipes);
            displayAppliances(updatedApplicances); 

            utensilUlElt.innerHTML = "";

        } else {

            rowCardElt.innerHTML = "";
            displayRecipesData();
            setIngredientsInDropdown();
            setAppliancesInDropdown();
            setUtensilsInDropdown();
        }
    });
}

searchRecipeInMainBar();
displayRecipesData();
setIngredientsInDropdown();
setAppliancesInDropdown();
setUtensilsInDropdown();
