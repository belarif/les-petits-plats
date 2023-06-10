function searchRecipesByAppliancesTags(applianceTags, recipes) {
  let results = recipes;
  applianceTags.forEach((applianceTag) => {
    results = results.filter((recipe) => {
      if (recipe.appliance === applianceTag) {
        return recipe;
      }
    });
  });
  return results;
}

function searchRecipesByIngredientsTags(ingredientTags, recipes) {
  let results = recipes;
  ingredientTags.forEach((ingredientTag) => {
    results = results.filter((recipe) => {
      const r = recipe.ingredients.find((ingredient) => {
        return ingredient.ingredient.includes(ingredientTag);
      });
      return r ? r : false;
    });
  });
  return results;
}

function searchRecipesByUtensilsTags(utensilTags, recipes) {
  let results = recipes;
  utensilTags.forEach((utensilTag) => {
    results = results.filter((recipe) => {
      const r = recipe.ustensils.find((ustensil) => {
        return ustensil.includes(utensilTag);
      });
      return r ? r : false;
    });
  });
  return results;
}

function searchRecipesByNameDescriptionAndIngredient(keyword) {
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

function getCurrentIngredientsTags() {
  const btns = document.querySelectorAll(".ingredient-tag button");
  return Array.from(btns).map((btn) => btn.textContent);
}

function getCurrentAppliancesTags() {
  const btns = document.querySelectorAll(".appliance-tag button");
  return Array.from(btns).map((btn) => btn.textContent);
}

function getCurrentUtensilsTags() {
  const btns = document.querySelectorAll(".utensil-tag button");
  return Array.from(btns).map((btn) => btn.textContent);
}

function getCurrentKeyword() {
  const input = document.querySelector(".main-search");
  return input.textContent;
}

function cleanArrayItems(tagString, array) {
  const a = [tagString, ...array].filter((item) => item);
  const uniques = new Set(a);
  return Array.from(uniques);
}

function search(keyword, ingredientTag, applianceTag, utensilTag) {
  if (!keyword) {
    keyword = getCurrentKeyword();
  }
  let results = searchRecipesByNameDescriptionAndIngredient(keyword);
  results = searchRecipesByIngredientsTags(
    cleanArrayItems(ingredientTag, [...getCurrentIngredientsTags()]),
    results
  );
  results = searchRecipesByAppliancesTags(
    cleanArrayItems(applianceTag, [...getCurrentAppliancesTags()]),
    results
  );
  results = searchRecipesByUtensilsTags(
    cleanArrayItems(utensilTag, [...getCurrentUtensilsTags()]),
    results
  );
  return results;
}
