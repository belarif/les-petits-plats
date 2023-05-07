"use_strict";

function displayRecipesData() {
    const recipeCardElt = document.querySelector(".recipe-cards");
    recipes.forEach((recipe) => {
        const recipeModel = recipeCardsFactory(recipe);
        const recipeDOM = recipeModel.getRecipeDOM();
        recipeCardElt.appendChild(recipeDOM);
    });
}

const dropdownUlElt = document.querySelector(".dropdown-ul");
const dropdownElt = document.querySelector(".dropdown-wrapper");
const filterLabelElt = document.querySelector(".dropdown-label");
const chevronUpElt = document.querySelector(".bi-chevron-up");
const chevronDownElt = document.querySelector(".bi-chevron-down");
const searchIngredientElt = document.querySelector(".search-ingredient");
const chevronsElt = document.querySelector(".chevrons");

function openDropdownList() {
    dropdownUlElt.style.opacity = "1";
    dropdownElt.style.borderRadius = "5px 5px 0 0";
    chevronDownElt.style.display = "none";
    chevronUpElt.style.display = "block";
    searchIngredientElt.style.display = "block";
    filterLabelElt.style.display = "none";
}

function closeDropdownList() {  
    dropdownUlElt.style.opacity = "0";
    dropdownElt.style.borderRadius = "5px";
    chevronDownElt.style.display = "block";
    chevronUpElt.style.display = "none";
    filterLabelElt.style.display = "block";
    searchIngredientElt.style.display = "none";
}

function navigateOnFilterWithMouse() {
    let direction = false;
    chevronsElt.addEventListener("click", () => {
        if (direction === false) {
            openDropdownList();
            direction = true;
        } else {
            closeDropdownList();
            direction = false;
        }
    });
}

navigateOnFilterWithMouse();

displayRecipesData();