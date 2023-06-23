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

  return Array.from(new Set(ingredients));
}

/**
 *
 * @param {object} searchedRecipes
 * @returns {object}
 */
function getUpdatedIngredients(searchedRecipes) {
  let updatedIngredients = [];

  searchedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      updatedIngredients = updatedIngredients.concat(ingredient.ingredient);
    });
  });

  return Array.from(new Set(updatedIngredients));
}

/**
 *
 * @param {string} keyword
 * @returns {object}
 */
function searchInIngredients(keyword) {
  const ingredients = getIngredients();
  let searchedIngredients = [];
  searchInItems(ingredients, keyword, searchedIngredients);

  return searchedIngredients;
}

function setIngredientsInDropdown() {
  const ingredients = getIngredients();
  setItemsDropdown(ingredients, ingredientUlElt);
}

function searchRecipesInIngredientsBar() {
  const ingredientsSearchElt = document.querySelector(".ingredient .search");

  ingredientsSearchElt.addEventListener("keyup", (e) => {
    let keywordIngredient = e.target.value;
    let searchedIngredients = [];
    const searchedRecipes = getRecipesByIngredient(keywordIngredient);
    const updatedIngredients = getUpdatedIngredients(searchedRecipes);

    filterByDropdown(
      updatedIngredients,
      searchedIngredients,
      keywordIngredient
    );

    if (keywordIngredient.length >= 3) {
      ingredientUlElt.innerHTML = "";
      setItemsDropdown(searchedIngredients, ingredientUlElt);
    } else {
      closeIngredientTag();
    }

    filterByIngredients();
  });
}

function filterByIngredients() {
  const ingredientsLiElt = document.querySelectorAll(
    ".ingredient .dropdown-ul li"
  );

  ingredientsLiElt.forEach((ingredientLiElt) => {
    ingredientLiElt.addEventListener("click", (e) => {
      displayIngredientTag(ingredientLiElt);

      const ingredientTag = e.target.innerText;
      const keyword = getCurrentKeyword();
      searchedRecipes = search(keyword, ingredientTag);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      closeIngredientTag();
      filterByIngredients();
      filterByAppliances();
      filterByUtensils();
    });
  });
}

/**
 *
 * @param {object} ingredientLiElt
 */
function displayIngredientTag(ingredientLiElt) {
  ingredientLiElt.style.display = "none";
  const buttonType = "btn btn-primary";
  const dropdownItem = "ingredient";

  createTagBtn(ingredientLiElt, buttonType, dropdownItem);
}

function closeIngredientTag() {
  const ingredientTagElts = document.querySelectorAll(".ingredient-tag");
  ingredientTagElts.forEach((ingredientTagElt) => {
    const closeIngredientTagElt = ingredientTagElt.childNodes[1];

    closeIngredientTagElt.addEventListener("click", (e) => {
      ingredientTagElt.remove();
      const ingredientTag = e.target.innerText;
      const keyword = getCurrentKeyword();
      searchedRecipes = search(keyword, ingredientTag);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      filterByIngredients();
      filterByAppliances();
      filterByUtensils();
    });
  });
}
