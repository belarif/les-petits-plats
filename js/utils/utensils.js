"use_strict";

// DOM elements
const utensilTagElt = document.querySelector(".utensil-tag");

/**
 * 
 * @returns {object}
 */
function getUtensils() {
    let utensils = [];
    recipes.forEach((recipe) => {
        utensils = [
            ...utensils,
            ...recipe.ustensils,
          ]; 
    });

    return Array.from(new Set (utensils));
}

/**
 * 
 * @param {object} searchedRecipes 
 * @returns {object}
 */
function getUpdatedUtensils(searchedRecipes) {
    let updatedUtensils = [];

    searchedRecipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            updatedUtensils = updatedUtensils.concat(ustensil);
        })
    });

    return Array.from (new Set (updatedUtensils));
}

function setUtensilsInDropdown() {
    const utensils = getUtensils();
    displayUtensils(utensils);
}

/**
 * 
 * @param {object} utensils
 */
function displayUtensils(utensils) {
    utensils.forEach(utensil => {
        const utensilLiElt = document.createElement("li");
        utensilLiElt.textContent = utensil;
        utensilUlElt.appendChild(utensilLiElt);
    })
}

/**
 * 
 * @param {object} updatedUtensils 
 */
function filterByUtensils() {
    const utensilsSearchElt = document.querySelector(".utensil .search");

    utensilsSearchElt.addEventListener("keyup", (e) => {
        let searchedUtensils = [];
        let keywordUtensil = e.target.value;
        const searchedRecipes = getRecipesByNameDescriptionAndIngredient(keywordUtensil);
        const updatedUtensils = getUpdatedUtensils(searchedRecipes);
        
        filterByDropdown(updatedUtensils, searchedUtensils, keywordUtensil);

        if (keywordUtensil.length >= 3) {
            utensilUlElt.innerHTML = "";
            displayUtensils(searchedUtensils); 
        } else {
            utensilUlElt.innerHTML = "";
            displayUtensils(updatedUtensils);
        }

        displayIngredientTag();
        displayApplianceTag();
        displayUtensilTag();
    });
}

function displayUtensilTag() {
    const utensilsLiElt = document.querySelectorAll(".utensil .dropdown-ul li");

    utensilsLiElt.forEach(utensilLiElt => {
        utensilLiElt.addEventListener("click", () => {
            utensilLiElt.style.display = "none";
            const buttonType = "btn btn-danger";
            const dropdownItem = "utensil";

            createTagBtn(utensilLiElt, buttonType, dropdownItem);
            closeUtensilTag();
        });
    });
}

function closeUtensilTag() {
    const utensilTagElts = document.querySelectorAll(".utensil-tag");
    utensilTagElts.forEach(utensilTagElt => {
        const closeUtensilTagElt = utensilTagElt.childNodes[1];

        closeUtensilTagElt.addEventListener("click", () => {
            utensilTagElt.remove();
        })
    });
}

