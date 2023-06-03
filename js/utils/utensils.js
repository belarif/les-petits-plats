"use_strict";

// DOM elements
const utensilTagElt = document.querySelector(".utensil-tag");
let utensilTags = [];

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

/**
 * 
 * @param {string} keyword 
 * @returns 
 */
function searchInUtensils(keyword) {
    const utensils = getUtensils();
    let searchedUtensils = [];

    utensils.forEach(utensil => {
        let regex = new RegExp(keyword, "ig");
        let search = utensil.match(regex);
        
        if (search) {
            searchedUtensils.unshift(utensil);
            
        }
    });

    return searchedUtensils;
}

/**
 * 
 * @param {string} keyword 
 * @returns 
 */
function getRecipesByUtensilsTags(utensilTags) {
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

function setUtensilsInDropdown() {
    const utensils = getUtensils();
    displayItemsDropdown(utensils, utensilUlElt);
}

function searchRecipesInUtensilsBar() {
    const utensilsSearchElt = document.querySelector(".utensil .search");

    utensilsSearchElt.addEventListener("keyup", (e) => {
        let searchedUtensils = [];
        let keywordUtensil = e.target.value;
        const searchedRecipes = getRecipesByNameDescriptionAndIngredient(keywordUtensil);
        const updatedUtensils = getUpdatedUtensils(searchedRecipes);
        
        filterByDropdown(updatedUtensils, searchedUtensils, keywordUtensil);

        if (keywordUtensil.length >= 3) {
            utensilUlElt.innerHTML = "";
            displayItemsDropdown(searchedUtensils, utensilUlElt); 
        } else {
            utensilUlElt.innerHTML = "";
            displayItemsDropdown(updatedUtensils, utensilUlElt);
        }

        filterByUtensils();
    });
}

function filterByUtensils() {
    const utensilsLiElt = document.querySelectorAll(".utensil .dropdown-ul li");

    utensilsLiElt.forEach(utensilLiElt => {
        utensilLiElt.addEventListener("click", (e) => {
            displayUtensilTag(utensilLiElt);

            const utensilTag = e.target.innerText;
            utensilTags = utensilTags.concat(utensilTag);
            const searchedRecipes = getRecipesByUtensilsTags(utensilTags);
            refreshRecipes(searchedRecipes);
            refreshDropdowns(searchedRecipes);
            filterByUtensils();
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
    closeUtensilTag();
}

function closeUtensilTag() {
    const utensilTagElts = document.querySelectorAll(".utensil-tag");
    utensilTagElts.forEach(utensilTagElt => {
        const closeUtensilTagElt = utensilTagElt.childNodes[1];

        closeUtensilTagElt.addEventListener("click", () => {
            utensilTagElt.remove();

            const index = utensilTags.indexOf(utensilTagElt.textContent);
            utensilTags.splice(index, 1);
            searchedRecipes = getRecipesByUtensilsTags(utensilTags);
            refreshRecipes(searchedRecipes);
            refreshDropdowns(searchedRecipes);
            filterByUtensils();
        })
    });
}

