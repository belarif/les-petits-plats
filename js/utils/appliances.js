"use_strict";

/**
 *
 * @returns {object}
 */
function getAppliances() {
  let appliances = [];
  recipes.forEach((recipe) => {
    appliances = appliances.concat(recipe.appliance);
  });

  return Array.from(new Set(appliances));
}

/**
 *
 * @param {object} searchedRecipes
 * @returns {object}
 */
function getUpdatedAppliances(searchedRecipes) {
  let updatedAppliances = [];

  searchedRecipes.forEach((recipe) => {
    updatedAppliances = updatedAppliances.concat(recipe.appliance);
  });

  return Array.from(new Set(updatedAppliances));
}

/**
 *
 * @param {string} keyword
 * @returns
 */
function searchInAppliances(keyword) {
  const appliances = getAppliances();
  let searchedAppliances = [];

  appliances.forEach((appliance) => {
    let regex = new RegExp(keyword, "ig");
    let search = appliance.match(regex);

    if (search) {
      searchedAppliances.unshift(appliance);
    }
  });

  return searchedAppliances;
}

function getRecipesByAppliancesTags() {
  const applianceTags = getCurrentAppliancesTags();
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

/**
 *
 * @param {string} keyword
 * @returns
 */
function getRecipesByAppliance(keyword) {
  const searchedAppliances = searchInAppliances(keyword);

  const recipeByAppliance = recipes.filter((recipe) => {
    let result = false;
    const r = searchedAppliances.includes(recipe.appliance);

    if (r) {
      result = true;
    }

    return result;
  });

  return recipeByAppliance;
}

function setAppliancesInDropdown() {
  const appliances = getAppliances();
  setItemsDropdown(appliances, applianceUlElt);
}

function searchRecipesInAppliancesBar() {
  const appliancesSearchElt = document.querySelector(".appliance .search");

  appliancesSearchElt.addEventListener("keyup", (e) => {
    let searchedAppliances = [];
    let keywordAppliance = e.target.value;
    const searchedRecipes = getRecipesByAppliance(keywordAppliance);
    const updatedApplicances = getUpdatedAppliances(searchedRecipes);

    filterByDropdown(updatedApplicances, searchedAppliances, keywordAppliance);

    if (keywordAppliance.length >= 3) {
      applianceUlElt.innerHTML = "";
      setItemsDropdown(searchedAppliances, applianceUlElt);
    } else {
      const searchedRecipes = getRecipesByAppliancesTags();
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      closeApplianceTag();
    }

    filterByAppliances();
  });
}

function filterByAppliances() {
  const appliancesLiElt = document.querySelectorAll(
    ".appliance .dropdown-ul li"
  );

  appliancesLiElt.forEach((applianceLiElt) => {
    applianceLiElt.addEventListener("click", (e) => {
      displayApplianceTag(applianceLiElt);

      const applianceTag = e.target.innerText;
      const searchedRecipes = search(null, null, applianceTag);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      closeApplianceTag();
      filterByAppliances();
      filterByIngredients();
      filterByUtensils();
    });
  });
}

/**
 *
 * @param {object} applianceLiElt
 */
function displayApplianceTag(applianceLiElt) {
  applianceLiElt.style.display = "none";
  const buttonType = "btn btn-success";
  const dropdownItem = "appliance";

  createTagBtn(applianceLiElt, buttonType, dropdownItem);
}

function closeApplianceTag() {
  const applianceTagElts = document.querySelectorAll(".appliance-tag");
  applianceTagElts.forEach((applianceTagElt) => {
    const closeApplianceTagElt = applianceTagElt.childNodes[1];

    closeApplianceTagElt.addEventListener("click", (e) => {
      applianceTagElt.remove();
      const applianceTag = e.target.innerText;
      const searchedRecipes = search(null, null, applianceTag);
      refreshRecipes(searchedRecipes);
      refreshDropdowns(searchedRecipes);
      filterByAppliances();
    });
  });
}
