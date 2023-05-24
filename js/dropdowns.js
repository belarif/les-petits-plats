"use_strict";

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

function filterByDropdown(itemsSearch, searchedItems, keyword) {
    itemsSearch.forEach(item => {
        let regex = new RegExp(keyword, "ig");
        let search = item.match(regex);

        if (search) {
            searchedItems.unshift(item);
        }
    });
}

filterByIngredients();
filterByAppliances();
filterByUtensils();
