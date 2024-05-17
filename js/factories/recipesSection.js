"use_strict";

/**
 *
 * @param {object} colDivElt
 * @param {object} rowCardElt
 */
function addColDiv(colDivElt, rowCardElt) {
  colDivElt.setAttribute("class", "col");
  rowCardElt.appendChild(colDivElt);
}

/**
 *
 * @param {object} cardDivElt
 * @param {object} colDivElt
 */
function addCardDiv(cardDivElt, colDivElt) {
  cardDivElt.setAttribute("class", "card h-100");
  colDivElt.appendChild(cardDivElt);
}

/**
 *
 * @param {object} cardHeaderDivElt
 * @param {object} cardDivElt
 */
function addCardHeaderDiv(cardHeaderDivElt, cardDivElt) {
  cardHeaderDivElt.setAttribute("class", "card-header");
  cardDivElt.appendChild(cardHeaderDivElt);
}

/**
 *
 * @param {object} recipeImgElt
 * @param {object} cardHeaderDivElt
 */
function addRecipeImg(recipeImgElt, cardHeaderDivElt, image) {
  recipeImgElt.setAttribute("src", `assets/recipe-images/${image}`);
  recipeImgElt.style.width = "100%";
  recipeImgElt.style.height = "100%";
  recipeImgElt.style.objectFit = "cover";
  cardHeaderDivElt.appendChild(recipeImgElt);
}

/**
 *
 * @param {object} cardBodyDivElt
 * @param {object} cardDivElt
 */
function addCardBodyDiv(cardBodyDivElt, cardDivElt) {
  cardBodyDivElt.setAttribute("class", "card-body");
  cardDivElt.appendChild(cardBodyDivElt);
}

/**
 *
 * @param {object} headerCardBodyElt
 * @param {object} cardBodyDivElt
 */
function addHeaderCardBody(headerCardBodyElt, cardBodyDivElt) {
  cardBodyDivElt.appendChild(headerCardBodyElt);
}

/**
 *
 * @param {object} recipeNameElt
 * @param {object} headerCardBodyElt
 * @param {string} name
 */
function addRecipeName(recipeNameElt, headerCardBodyElt, name) {
  recipeNameElt.textContent = name;
  headerCardBodyElt.appendChild(recipeNameElt);
}

/**
 *
 * @param {object} recipeTimeElt
 * @param {object} clockElt
 * @param {object} headerCardBodyElt
 * @param {number} time
 */
function addRecipeTime(recipeTimeElt, clockElt, headerCardBodyElt, time) {
  clockElt.setAttribute("class", "bi bi-clock");
  recipeTimeElt.textContent = time + ` min`;
  headerCardBodyElt.appendChild(clockElt).appendChild(recipeTimeElt);
}

/**
 *
 * @param {object} recipeAndDescriptionDivElt
 * @param {object} cardBodyDivElt
 */
function createRecipeAndDescriptionDiv(
  recipeAndDescriptionDivElt,
  cardBodyDivElt
) {
  recipeAndDescriptionDivElt.setAttribute("class", "recipe-description");
  cardBodyDivElt.appendChild(recipeAndDescriptionDivElt);
}

/**
 *
 * @param {object} recipesUlElt
 * @param {object} recipeAndDescriptionDivElt
 */
function addRecipesDiv(recipesUlElt, recipeAndDescriptionDivElt) {
  recipesUlElt.setAttribute("class", "recipes");
  recipeAndDescriptionDivElt.appendChild(recipesUlElt);
}

/**
 *
 * @param {object} recipesUlElt
 * @param {object} ingredients
 */
function addRecipesLi(recipesUlElt, ingredients) {
  ingredients.forEach((ingredient) => {
    const recipesLiELt = document.createElement("li");
    const nameIngredientElt = document.createElement("b");
    recipesLiELt.appendChild(nameIngredientElt);
    nameIngredientElt.textContent = ingredient.ingredient;

    if (ingredient.unit) {
      const quantityElt = document.createTextNode(
        " : " + ingredient.quantity + ` ` + ingredient.unit
      );
      recipesLiELt.appendChild(quantityElt);
    } else if (ingredient.quantity) {
      const quantityElt = document.createTextNode(" : " + ingredient.quantity);
      recipesLiELt.appendChild(quantityElt);
    }

    recipesUlElt.appendChild(recipesLiELt);
  });
}

/**
 *
 * @param {object} recipeDescriptionElt
 * @param {object} recipeAndDescriptionDivElt
 * @param {string} description
 */
function addRecipeDescription(
  recipeDescriptionElt,
  recipeAndDescriptionDivElt,
  description
) {
  recipeDescriptionElt.textContent = description;
  recipeAndDescriptionDivElt.appendChild(recipeDescriptionElt);
}

/**
 *
 * @param {Object} recipe
 * @returns {object}
 */
function recipeCardsFactory(recipe) {
  const rowCardElt = document.querySelector(".row-card");
  const colDivElt = document.createElement("div");
  const cardDivElt = document.createElement("div");
  const cardHeaderDivElt = document.createElement("div");
  const recipeImgElt = document.createElement("img");
  const cardBodyDivElt = document.createElement("div");
  const headerCardBodyElt = document.createElement("header");
  const recipeNameElt = document.createElement("h3");
  const recipeTimeElt = document.createElement("b");
  const clockElt = document.createElement("i");
  const recipeAndDescriptionDivElt = document.createElement("div");
  const recipesUlElt = document.createElement("ul");
  const recipeDescriptionElt = document.createElement("p");

  function getRecipeDOM() {
    addColDiv(colDivElt, rowCardElt);
    addCardDiv(cardDivElt, colDivElt);
    addCardHeaderDiv(cardHeaderDivElt, cardDivElt);
    addRecipeImg(recipeImgElt, cardHeaderDivElt, recipe.image); //////////////////////////////
    addCardBodyDiv(cardBodyDivElt, cardDivElt);
    addHeaderCardBody(headerCardBodyElt, cardBodyDivElt);
    addRecipeName(recipeNameElt, headerCardBodyElt, recipe.name);
    addRecipeTime(recipeTimeElt, clockElt, headerCardBodyElt, recipe.time);
    createRecipeAndDescriptionDiv(recipeAndDescriptionDivElt, cardBodyDivElt);
    addRecipesDiv(recipesUlElt, recipeAndDescriptionDivElt);
    addRecipesLi(recipesUlElt, recipe.ingredients);
    addRecipeDescription(
      recipeDescriptionElt,
      recipeAndDescriptionDivElt,
      recipe.description
    );

    return rowCardElt;
  }

  return { getRecipeDOM };
}
