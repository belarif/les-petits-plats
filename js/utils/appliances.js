"use_strict";

// DOM elements
const applianceTagElt = document.querySelector(".appliance-tag");
let applianceTags = [];

/**
 * 
 * @returns {object}
 */
function getAppliances() {
    let appliances = [];
    recipes.forEach((recipe) => {
        appliances = appliances.concat(recipe.appliance);
    })

    return Array.from(new Set (appliances));
}

/**
 * 
 * @param {object} searchedRecipes 
 * @returns {object}
 */
function getUpdatedAppliances(searchedRecipes) {
    let updatedAppliances = [];

    searchedRecipes.forEach(recipe => {
        updatedAppliances = updatedAppliances.concat(recipe.appliance);
    });

    return Array.from (new Set (updatedAppliances));
}

/**
 * 
 * @param {string} keyword 
 * @returns 
 */
function searchInAppliances(keyword) {
    const appliances = getAppliances();
    let searchedAppliances = [];

    appliances.forEach(appliance => {
        let regex = new RegExp(keyword, "ig");
        let search = appliance.match(regex);
        
        if (search) {
            searchedAppliances.unshift(appliance);
            
        }
    });

    return searchedAppliances;
}

/**
 * 
 * @param {string} keyword 
 * @returns 
 */
function getRecipesByAppliancesTags(applianceTags) {
    let results = recipes;
    applianceTags.forEach((applianceTag) => {
      results = results.filter((recipe) => {
        if(recipe.appliance === applianceTag) {
            return recipe;
        }
    });
  });
  return results;
}

function setAppliancesInDropdown() {
    const appliances = getAppliances();
    displayItemsDropdown(appliances, applianceUlElt);
}

function searchRecipesInAppliancesBar() {
    const appliancesSearchElt = document.querySelector(".appliance .search");

    appliancesSearchElt.addEventListener("keyup", (e) => {
        let searchedAppliances = [];
        let keywordAppliance = e.target.value;
        const searchedRecipes = getRecipesByNameDescriptionAndIngredient(keywordAppliance);
        const updatedApplicances = getUpdatedAppliances(searchedRecipes);
        
        filterByDropdown(updatedApplicances, searchedAppliances, keywordAppliance);

        if (keywordAppliance.length >= 3) {
            applianceUlElt.innerHTML = "";
            displayItemsDropdown(searchedAppliances, applianceUlElt); 
        } else {
            applianceUlElt.innerHTML = "";
            displayItemsDropdown(updatedApplicances, applianceUlElt);
        }

        filterByAppliances();
    });
}

function filterByAppliances() {
    const appliancesLiElt = document.querySelectorAll(".appliance .dropdown-ul li");

    appliancesLiElt.forEach(applianceLiElt => {
        applianceLiElt.addEventListener("click", (e) => {
            displayApplianceTag(applianceLiElt);

            const applianceTag = e.target.innerText;
            applianceTags = applianceTags.concat(applianceTag);
            const searchedRecipes = getRecipesByAppliancesTags(applianceTags);
            refreshRecipes(searchedRecipes);
            refreshDropdowns(searchedRecipes);
            filterByAppliances();
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
    closeApplianceTag();
}

function closeApplianceTag() {
    const applianceTagElts = document.querySelectorAll(".appliance-tag");
    applianceTagElts.forEach(applianceTagElt => {
        const closeApplianceTagElt = applianceTagElt.childNodes[1];

        closeApplianceTagElt.addEventListener("click", () => {
            applianceTagElt.remove();
            const index = applianceTags.indexOf(applianceTagElt.textContent);

            if(index >= 0) {
                applianceTags.splice(index, 1);
            }
            
            searchedRecipes = getRecipesByAppliancesTags(applianceTags);
            refreshRecipes(searchedRecipes);
            refreshDropdowns(searchedRecipes);
            filterByAppliances();
        });
    });
}