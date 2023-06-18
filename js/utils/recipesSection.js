"use_strict";

// DOM elements
const ingredientUlElt = document.querySelector(".ingredient .dropdown-ul");
const applianceUlElt = document.querySelector(".appliance .dropdown-ul");
const utensilUlElt = document.querySelector(".utensil .dropdown-ul");
const rowCardElt = document.querySelector(".row-card");
const recipeCardElt = document.querySelector(".recipe-cards");
const noRecipesElt = document.querySelector(".no-recipes");

/**
 *
 * @returns {object}
 */
function getNames() {
  let names = [];

  for (let i = 0; i < recipes.length; i++) {
    names = names.concat(recipes[i].name);
  }

  return Array.from(new Set(names));
}

/**
 *
 * @returns {object}
 */
function getDescriptions() {
  let descriptions = [];

  for (let i = 0; i < recipes.length; i++) {
    descriptions = descriptions.concat(recipes[i].description);
  }

  return Array.from(new Set(descriptions));
}

/**
 *
 * @param {string} keyword
 * @returns {object}
 */
function searchInNames(keyword) {
  const names = getNames();
  let searchedNames = [];

  for (let name of names) {
    let regex = new RegExp(keyword, "ig");
    let search = name.match(regex);

    if (search) {
      searchedNames.unshift(name);
    }
  }

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

  for (let description of descriptions) {
    let regex = new RegExp(keyword, "ig");
    let search = description.match(regex);

    if (search) {
      searchedDescriptions.unshift(description);
    }
  }

  return searchedDescriptions;
}

/**
 *
 * @param {string} keyword
 * @returns {object}
 */
function getRecipesByName(keyword) {
  const searchedNames = searchInNames(keyword);
  let recipesByName = [];

  for (let name of searchedNames) {
    for (let recipe of recipes) {
      if (recipe.name === name) {
        recipesByName = recipesByName.concat(recipe);
      }
    }
  }

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

  for (let description of searchedDescriptions) {
    for (let recipe of recipes) {
      if (recipe.description === description) {
        recipesByDescription = recipesByDescription.concat(recipe);
      }
    }
  }

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

function searchRecipesInMainBar() {
  const mainSearch = document.querySelector(".main-search");
  mainSearch.addEventListener("keyup", (e) => {
    let keywordMainSearch = e.target.value;

    if (keywordMainSearch.length >= 3) {
      const searchedRecipes = search(keywordMainSearch);

      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
    } else {
      rowCardElt.innerHTML = "";
      ingredientUlElt.innerHTML = "";
      applianceUlElt.innerHTML = "";
      utensilUlElt.innerHTML = "";
      noRecipesElt.style.display = "none";
      displayRecipesAndDropdownsContent();
    }

    filterByIngredients();
    filterByAppliances();
    filterByUtensils();
  });
}
