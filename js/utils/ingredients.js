"use_strict";

// DOM elements
let ingredientTags = [];

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
      const ingredientTagElts = document.querySelectorAll(".ingredient-tag");

      ingredientTagElts.forEach((ingredientTagElt) => {
        const ingredientTag = ingredientTagElt.innerText;
        ingredientTags = ingredientTags.concat(ingredientTag);
      });
      const searchedRecipes = getRecipesByIngredientsTags(ingredientTags);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      closeIngredientTag();
    }

    filterByIngredients();
  });
}

function getRecipesByIngredientsTags(ingredientTags) {
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

function filterByIngredients() {
  const ingredientsLiElt = document.querySelectorAll(
    ".ingredient .dropdown-ul li"
  );

  ingredientsLiElt.forEach((ingredientLiElt) => {
    ingredientLiElt.addEventListener("click", (e) => {
      displayIngredientTag(ingredientLiElt);

      const ingredientTag = e.target.innerText;
      ingredientTags = ingredientTags.concat(ingredientTag);
      searchedRecipes = getRecipesByIngredientsTags(ingredientTags);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      closeIngredientTag();

      filterByIngredients();
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

    closeIngredientTagElt.addEventListener("click", () => {
      ingredientTagElt.remove();
      const index = ingredientTags.indexOf(ingredientTagElt.textContent);

      if (index >= 0) {
        ingredientTags.splice(index, 1);
      }

      searchedRecipes = getRecipesByIngredientsTags(ingredientTags);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      filterByIngredients();
    });
  });
}
