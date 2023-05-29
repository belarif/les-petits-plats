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

// function displayApplianceTag() {
//     const appliancesLiElt = document.querySelectorAll(".appliance .dropdown-ul li");

//     appliancesLiElt.forEach(applianceLiElt => {
//         applianceLiElt.addEventListener("click", () => {
//             applianceLiElt.style.display = "none";
//             const buttonType = "btn btn-success";
//             const dropdownItem = "appliance";

//             createTagBtn(applianceLiElt, buttonType, dropdownItem);
//             closeApplianceTag();
//         });
//     });
// }
