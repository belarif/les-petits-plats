"use_strict";

// DOM elements
const applianceTagElt = document.querySelector(".appliance-tag");

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
function getRecipesByAppliances(keyword) {
    const searchedAppliances = searchInAppliances(keyword);
    let recipesByAppliances = [];

    searchedAppliances.forEach(appliance => {
        const recipesByAppliance = recipes.filter((recipe) => { 
            return recipe.appliance === appliance;
        });
        recipesByAppliances = recipesByAppliances.concat(recipesByAppliance);
    });

    return recipesByAppliances;
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
            const searchedRecipes = getRecipesByAppliances(applianceTag);
            refreshRecipes(searchedRecipes);
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
        })
    });
}