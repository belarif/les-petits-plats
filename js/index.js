"use_strict";

function setRecipes(recipes) {
  const recipesOrderedByName = orderRecipesByName(recipes);

  recipesOrderedByName.forEach((recipe) => {
    const recipeModel = recipeCardsFactory(recipe);
    const recipeDOM = recipeModel.getRecipeDOM();
    recipeCardElt.appendChild(recipeDOM);
  });
}

/**
 *
 * @param {object} recipes
 * @returns {object}
 */
function orderRecipesByName(recipes) {
  return recipes.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
}

/**
 *
 * @param {object} searchedRecipes
 */
function refreshRecipes(searchedRecipes) {
  rowCardElt.innerHTML = "";
  setRecipes(searchedRecipes);
}

/**
 *
 * @param {object} searchedRecipes
 */
function refreshDropdowns(searchedRecipes) {
  ingredientUlElt.innerHTML = "";
  const updatedIngredients = getUpdatedIngredients(searchedRecipes);
  setItemsDropdown(updatedIngredients, ingredientUlElt);

  applianceUlElt.innerHTML = "";
  const updatedApplicances = getUpdatedAppliances(searchedRecipes);
  setItemsDropdown(updatedApplicances, applianceUlElt);

  utensilUlElt.innerHTML = "";
  const updatedUtensils = getUpdatedUtensils(searchedRecipes);
  setItemsDropdown(updatedUtensils, utensilUlElt);
}

function globalSearch() {}

function init() {
  const allRecipes = recipes;

  setRecipes(allRecipes);
  setIngredientsInDropdown();
  setAppliancesInDropdown();
  setUtensilsInDropdown();

  searchRecipesInMainBar();
  searchRecipesInIngredientsBar();
  searchRecipesInAppliancesBar();
  searchRecipesInUtensilsBar();

  filterByIngredients();
  filterByAppliances();
  filterByUtensils();
}

init();
