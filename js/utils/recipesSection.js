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
function getNames() {
  let names = [];
  recipes.forEach((recipe) => {
    names = names.concat(recipe.name);
  });

  return Array.from(new Set(names));
}

/**
 *
 * @returns {object}
 */
function getDescriptions() {
  let descriptions = [];
  recipes.forEach((recipe) => {
    descriptions = descriptions.concat(recipe.description);
  });

  return Array.from(new Set(descriptions));
}

/**
 *
 * @param {string} keyword
 * @returns {object}
 */
function searchInIngredients(keyword) {
  const ingredients = getIngredients();
  let searchedIngredients = [];

  ingredients.forEach((ingredient) => {
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
  names.forEach((name) => {
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
  descriptions.forEach((description) => {
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

  searchedNames.forEach((name) => {
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

  searchedDescriptions.forEach((description) => {
    const recipeByDescription = recipes.filter((recipe) => {
      return recipe.description === description;
    });
    recipesByDescription = recipesByDescription.concat(recipeByDescription);
  });

  return recipesByDescription;
}

/**
 *
 * @param {string} keyword
 * @returns {object}
 */
function getRecipesByIngredient(keyword) {
  const searchedIngredients = searchInIngredients(keyword);
  const recipeByIngredient = recipes.filter((recipe) => {
    let result = false;
    recipe.ingredients.forEach((ingredient) => {
      const r = searchedIngredients.includes(ingredient.ingredient);
      if (r) {
        result = true;
      }
    });

    return result;
  });

  return recipeByIngredient;
}

/**
 *
 * @param {string} keyword
 * @returns {object}
 */
function getRecipesByNameDescriptionAndIngredient(keyword) {
  const recipesByNames = getRecipesByName(keyword);
  const recipesByDescriptions = getRecipesByDescription(keyword);
  const recipesByIngredients = getRecipesByIngredient(keyword);

  let searchedRecipes = [];
  searchedRecipes = searchedRecipes
    .concat(recipesByNames)
    .concat(recipesByDescriptions)
    .concat(recipesByIngredients);
  searchedRecipes = Array.from(new Set(searchedRecipes));

  return searchedRecipes;
}

function searchRecipesInMainBar() {
  const mainSearch = document.querySelector(".main-search");
  mainSearch.addEventListener("keyup", (e) => {
    let keywordMainSearch = e.target.value;

    if (keywordMainSearch.length >= 3) {
      const searchedRecipes =
        getRecipesByNameDescriptionAndIngredient(keywordMainSearch);

      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
    } else {
      rowCardElt.innerHTML = "";
      ingredientUlElt.innerHTML = "";
      applianceUlElt.innerHTML = "";
      utensilUlElt.innerHTML = "";
      init();
    }

    filterByIngredients();
    filterByAppliances();
    filterByUtensils();
  });
}

searchRecipesInMainBar();
