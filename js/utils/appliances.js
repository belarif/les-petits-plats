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

function setAppliancesInDropdown() {
    const appliances = getAppliances();
    displayItemsDropdown(appliances, applianceUlElt);
}

function filterByAppliances() {
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

        displayApplianceTag();
    });
}

function displayApplianceTag() {
    const appliancesLiElt = document.querySelectorAll(".appliance .dropdown-ul li");

    appliancesLiElt.forEach(applianceLiElt => {
        applianceLiElt.addEventListener("click", () => {
            applianceLiElt.style.display = "none";
            const buttonType = "btn btn-success";
            const dropdownItem = "appliance";

            createTagBtn(applianceLiElt, buttonType, dropdownItem);
            closeApplianceTag();
        });
    });
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