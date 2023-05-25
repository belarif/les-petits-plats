"use_strict";

// DOM elements
const ingredientTagElt = document.querySelector(".ingredient-tag");
const applianceTagElt = document.querySelector(".appliance-tag");
const utensilTagElt = document.querySelector(".utensil-tag");

/**
 * 
 * @param {object} updatedIngredients 
 */
function filterByIngredients(updatedIngredients) {
    const ingredientsSearchElt = document.querySelector(".ingredient .search");

    ingredientsSearchElt.addEventListener("keyup", (e) => {
        let keywordIngredient = e.target.value;
        let searchedIngredients = [];

        filterByDropdown(updatedIngredients, searchedIngredients, keywordIngredient);

        if (keywordIngredient.length >= 3) {
            ingredientUlElt.innerHTML = "";
            displayIngredients(searchedIngredients); 
        } else {
            ingredientUlElt.innerHTML = "";
            displayIngredients(updatedIngredients);
        }
    });
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

/**
 * 
 * @param {object} updatedUtensils 
 */
function filterByUtensils(updatedUtensils) {
    const autensilsSearchElt = document.querySelector(".utensil .search");

    autensilsSearchElt.addEventListener("keyup", (e) => {
        let searchedUtensils = [];
        let keyword = e.target.value;
        
        filterByDropdown(updatedUtensils, searchedUtensils, keyword);

        if (keyword.length >= 3) {
            utensilUlElt.innerHTML = "";
            displayUtensils(searchedUtensils); 
        } else {
            utensilUlElt.innerHTML = "";
            displayUtensils(updatedUtensils);
        }
    });
}

/**
 * 
 * @param {object} itemsSearch 
 * @param {object} searchedItems
 * @param {string} keyword
 */
function filterByDropdown(itemsSearch, searchedItems, keyword) {
    itemsSearch.forEach(item => {
        let regex = new RegExp(keyword, "ig");
        let search = item.match(regex);

        if (search) {
            searchedItems.unshift(item);
        }
    });
}

function displayIngredientTag() {
    const ingredientsLiElt = document.querySelectorAll(".ingredient .dropdown-ul li");

    ingredientsLiElt.forEach(ingredientLiElt => {
        ingredientLiElt.addEventListener("click", (e) => {
            const buttonTagElt = document.querySelector(".ingredient-tag button");
            buttonTagElt.textContent = ingredientLiElt.textContent;
            ingredientTagElt.style.display = "block";
        });
    });
}

function closeIngredientTag() {
    const closeIngredientTagElt = document.querySelector(".ingredient-tag .badge");
    closeIngredientTagElt.addEventListener("click", () => {
        ingredientTagElt.style.display = "none";
        displayRecipesData();
        setIngredientsInDropdown();
    })
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

function displayUtensilTag() {
    const utensilsLiElt = document.querySelectorAll(".utensil .dropdown-ul li");

    utensilsLiElt.forEach(utensilLiElt => {
        utensilLiElt.addEventListener("click", () => {
            const buttonTagElt = document.querySelector(".utensil-tag button");
            buttonTagElt.textContent = utensilLiElt.textContent;
            utensilTagElt.style.display = "block";
        });
    });
}

function closeUtensilTag() {
    const closeUtensilTagElt = document.querySelector(".utensil-tag .badge");
    closeUtensilTagElt.addEventListener("click", () => {
        utensilTagElt.style.display = "none";
    })
}

displayIngredientTag();
closeIngredientTag();
displayApplianceTag();
closeApplianceTag();
displayUtensilTag();
closeUtensilTag();
