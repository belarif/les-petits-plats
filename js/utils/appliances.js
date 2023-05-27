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
    displayAppliances(appliances);
}

/**
 * 
 * @param {object} appliances
 */
function displayAppliances(appliances) {
    appliances.forEach(appliance => {
        const applianceLiElt = document.createElement("li");
        applianceLiElt.textContent = appliance;
        applianceUlElt.appendChild(applianceLiElt);
    })
}

/**
 * 
 * @param {object} updatedApplicances 
 */
function filterByAppliances(updatedApplicances) {
    const appliancesSearchElt = document.querySelector(".appliance .search");

    appliancesSearchElt.addEventListener("keyup", (e) => {
        let searchedAppliances = [];
        let keywordAppliance = e.target.value;

        filterByDropdown(updatedApplicances, searchedAppliances, keywordAppliance);

        if (keywordAppliance.length >= 3) {
            applianceUlElt.innerHTML = "";
            displayAppliances(searchedAppliances); 
        } else {
            applianceUlElt.innerHTML = "";
            displayAppliances(updatedApplicances);
        }
    });
}

function displayApplianceTag() {
    const appliancesLiElt = document.querySelectorAll(".appliance .dropdown-ul li");

    appliancesLiElt.forEach(applianceLiElt => {
        applianceLiElt.addEventListener("click", () => {
            const buttonTagElt = document.querySelector(".appliance-tag button");
            buttonTagElt.textContent = applianceLiElt.textContent;
            applianceTagElt.style.display = "block";

        });
    });
}

function closeApplianceTag() {
    const closeApplianceTagElt = document.querySelector(".appliance-tag .badge");
    closeApplianceTagElt.addEventListener("click", () => {
        applianceTagElt.style.display = "none";
    })
}

displayApplianceTag();
closeApplianceTag();