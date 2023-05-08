"use_strict";

function displayRecipesData() {
    const recipeCardElt = document.querySelector(".recipe-cards");
    recipes.forEach((recipe) => {
        const recipeModel = recipeCardsFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipeCardElt.appendChild(recipeDOM);
    });
}

// ingredient
const dropdownIngredientUlElt = document.querySelector(".dropdown-ul-ingredient");
const dropdownIngredientElt = document.querySelector(".dropdown-wrapper-ingredient");
const chevronsIngredientElt = document.querySelector(".chevrons-ingredient");
const filterIngredientLabelElt = document.querySelector(".dropdown-label-ingredient");
const searchIngredientElt = document.querySelector(".search-ingredient");
const chevronUpIngredientElt = document.querySelector(".chevron-up-ingredient");
const chevronDownIngredientElt = document.querySelector(".chevron-down-ingredient");

// appliance
const dropdownApplianceUlElt = document.querySelector(".dropdown-ul-appliance");
const dropdownApplianceElt = document.querySelector(".dropdown-wrapper-appliance");
const chevronsApplianceElt = document.querySelector(".chevrons-appliance");
const filterApplianceLabelElt = document.querySelector(".dropdown-label-appliance");
const searchApplianceElt = document.querySelector(".search-appliance");
const chevronUpApplianceElt = document.querySelector(".chevron-up-appliance");
const chevronDownApplianceElt = document.querySelector(".chevron-down-appliance");

function openDropdownList(dropdownElt, dropdownUlElt, filterLabelElt, searchElt, chevronUpElt, chevronDownElt) {
    dropdownUlElt.style.opacity = "1";
    dropdownElt.style.borderRadius = "5px 5px 0 0";
    chevronDownElt.style.display = "none";
    chevronUpElt.style.display = "block";
    searchElt.style.display = "block";
    filterLabelElt.style.display = "none";
}

function closeDropdownList(dropdownElt, dropdownUlElt, filterLabelElt, searchElt, chevronUpElt, chevronDownElt) {  
    dropdownUlElt.style.opacity = "0";
    dropdownElt.style.borderRadius = "5px";
    chevronDownElt.style.display = "block";
    chevronUpElt.style.display = "none";
    filterLabelElt.style.display = "block";
    searchElt.style.display = "none";
}

function navigateIngredientDropdown() {
    let direction = false;
    chevronsIngredientElt.addEventListener("click", () => {
        if (direction === false) {
            openDropdownList(dropdownIngredientElt, dropdownIngredientUlElt, filterIngredientLabelElt, searchIngredientElt, chevronUpIngredientElt, chevronDownIngredientElt);
            direction = true;
        } else {
            closeDropdownList(dropdownIngredientElt, dropdownIngredientUlElt, filterIngredientLabelElt, searchIngredientElt, chevronUpIngredientElt, chevronDownIngredientElt);
            direction = false;
        }
    });
}

function navigateApplianceDropdown() {
    let direction = false;
    chevronsApplianceElt.addEventListener("click", () => {
        if (direction === false) {
            openDropdownList(dropdownApplianceElt, dropdownApplianceUlElt, filterApplianceLabelElt, searchApplianceElt, chevronUpApplianceElt, chevronDownApplianceElt);
            direction = true;
        } else {
            closeDropdownList(dropdownApplianceElt, dropdownApplianceUlElt, filterApplianceLabelElt, searchApplianceElt, chevronUpApplianceElt, chevronDownApplianceElt);
            direction = false;
        }
    });
}

navigateIngredientDropdown();
navigateApplianceDropdown();

displayRecipesData();