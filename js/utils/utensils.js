"use_strict";

/**
 *
 * @returns {object}
 */
function getUtensils() {
  let utensils = [];
  recipes.forEach((recipe) => {
    utensils = [...utensils, ...recipe.ustensils];
  });

  return Array.from(new Set(utensils));
}

/**
 *
 * @param {object} searchedRecipes
 * @returns {object}
 */
function getUpdatedUtensils(searchedRecipes) {
  let updatedUtensils = [];

  searchedRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      updatedUtensils = updatedUtensils.concat(ustensil);
    });
  });

  return Array.from(new Set(updatedUtensils));
}

/**
 *
 * @param {string} keyword
 * @returns
 */
function searchInUtensils(keyword) {
  const utensils = getUtensils();
  let searchedUtensils = [];
  searchInItems(utensils, keyword, searchedUtensils);

  return searchedUtensils;
}

/**
 *
 * @param {string} keyword
 * @returns
 */
function getRecipesByUtensilsTags() {
  const utensilTags = getCurrentUtensilsTags();
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

/**
 *
 * @param {string} keyword
 * @returns
 */
function getRecipesByUtensil(keyword) {
  const searchedUtensils = searchInUtensils(keyword);
  const recipeByUtensil = recipes.filter((recipe) => {
    let result = false;
    recipe.ustensils.forEach((utensil) => {
      const r = searchedUtensils.includes(utensil);
      if (r) {
        result = true;
      }
    });

    return result;
  });

  return recipeByUtensil;
}

function setUtensilsInDropdown() {
  const utensils = getUtensils();
  setItemsDropdown(utensils, utensilUlElt);
}

function searchRecipesInUtensilsBar() {
  const utensilsSearchElt = document.querySelector(".utensil .search");

  utensilsSearchElt.addEventListener("keyup", (e) => {
    let searchedUtensils = [];
    let keywordUtensil = e.target.value;
    const searchedRecipes = getRecipesByUtensil(keywordUtensil);
    const updatedUtensils = getUpdatedUtensils(searchedRecipes);

    filterByDropdown(updatedUtensils, searchedUtensils, keywordUtensil);

    if (keywordUtensil.length >= 3) {
      utensilUlElt.innerHTML = "";
      setItemsDropdown(searchedUtensils, utensilUlElt);
    } else {
      closeUtensilTag();
    }

    filterByUtensils();
  });
}

function filterByUtensils() {
  const utensilsLiElt = document.querySelectorAll(".utensil .dropdown-ul li");

  utensilsLiElt.forEach((utensilLiElt) => {
    utensilLiElt.addEventListener("click", (e) => {
      displayUtensilTag(utensilLiElt);

      const utensilTag = e.target.innerText;
      const keyword = getCurrentKeyword();
      searchedRecipes = search(keyword, null, null, utensilTag);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      closeUtensilTag();
      filterByUtensils();
      filterByIngredients();
      filterByAppliances();
    });
  });
}

/**
 *
 * @param {object} utensilLiElt
 */
function displayUtensilTag(utensilLiElt) {
  utensilLiElt.style.display = "none";
  const buttonType = "btn btn-danger";
  const dropdownItem = "utensil";

  createTagBtn(utensilLiElt, buttonType, dropdownItem);
}

function closeUtensilTag() {
  const utensilTagElts = document.querySelectorAll(".utensil-tag");
  utensilTagElts.forEach((utensilTagElt) => {
    const closeUtensilTagElt = utensilTagElt.childNodes[1];

    closeUtensilTagElt.addEventListener("click", (e) => {
      utensilTagElt.remove();
      const utensilTag = e.target.innerText;
      searchedRecipes = search(null, null, null, utensilTag);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      filterByUtensils();
      filterByAppliances();
      filterByIngredients();
    });
  });
}
