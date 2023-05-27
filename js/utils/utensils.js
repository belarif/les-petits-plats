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

displayUtensilTag();
closeUtensilTag();

