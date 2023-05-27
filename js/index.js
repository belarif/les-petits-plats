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

function init() {
    const allRecipes = recipes;

    setRecipes(allRecipes);
    setIngredientsInDropdown();
    setAppliancesInDropdown();
    setUtensilsInDropdown();
}

init();
