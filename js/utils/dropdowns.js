"use_strict";

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

function displayItemsDropdown(items, ulElt) {
    items.forEach(item => {
        const liElt = document.createElement("li");
        liElt.textContent = item;
        ulElt.appendChild(liElt);
    })
}

