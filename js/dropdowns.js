"use_strict";

// DOM elements
const ingredientTagElt = document.querySelector(".ingredient-tag");
const applianceTagElt = document.querySelector(".appliance-tag");
const utensilTagElt = document.querySelector(".utensil-tag");

function filterByIngredients() {
    const ingredientsSearchElt = document.querySelector(".ingredient .search");

    ingredientsSearchElt.addEventListener("keyup", (e) => {
        let searchedIngredients = [];
        let keyword = e.target.value;
        const ingredientsSearch = getIngredients();

        filterByDropdown(ingredientsSearch, searchedIngredients, keyword);

        if (keyword.length >= 3) {
            ingredientUlElt.innerHTML = "";
            displayIngredients(searchedIngredients); 
        } else {
            ingredientUlElt.innerHTML = "";
            displayIngredients(searchedIngredients);
        }
    });
}

function filterByAppliances() {
    const appliancesSearchElt = document.querySelector(".appliance .search");

    appliancesSearchElt.addEventListener("keyup", (e) => {
        let searchedAppliances = [];
        let keyword = e.target.value;
        const appliancesSearch = getAppliances();

        filterByDropdown(appliancesSearch, searchedAppliances, keyword);

        if (keyword.length >= 3) {
            applianceUlElt.innerHTML = "";
            displayAppliances(searchedAppliances); 
        } else {
            applianceUlElt.innerHTML = "";
            displayAppliances(searchedAppliances);
        }
    });
}

function filterByUtensils() {
    const autensilsSearchElt = document.querySelector(".utensil .search");

    autensilsSearchElt.addEventListener("keyup", (e) => {
        let searchedUtensils = [];
        let keyword = e.target.value;
        const utensilsSearch = getUtensils();
        
        filterByDropdown(utensilsSearch, searchedUtensils, keyword);

        if (keyword.length >= 3) {
            utensilUlElt.innerHTML = "";
            displayUtensils(searchedUtensils); 
        } else {
            utensilUlElt.innerHTML = "";
            displayUtensils(searchedUtensils);
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
        ingredientLiElt.addEventListener("click", () => {
            const buttonTagElt = document.querySelector(".ingredient-tag button");
            buttonTagElt.textContent = ingredientLiElt.textContent;
            ingredientTagElt.style.display = "block";
        });
    });
}

function closeIngredientTag() {
    const closeIngredientTagElt = document.querySelector(".ingredient .badge");
    closeIngredientTagElt.addEventListener("click", () => {
        ingredientTagElt.style.display = "none";
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
    const closeApplianceTagElt = document.querySelector(".appliance .badge");
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
    const closeUtensilTagElt = document.querySelector(".utensil .badge");
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
filterByIngredients();
filterByAppliances();
filterByUtensils();
