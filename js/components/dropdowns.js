"use_strict";

function openDropdownList(
  dropdownElt,
  dropdownUlElt,
  filterLabelElt,
  searchElt,
  chevronUpElt,
  chevronDownElt
) {
  dropdownUlElt.style.opacity = "1";
  dropdownElt.style.borderRadius = "5px 5px 0 0";
  chevronDownElt.style.display = "none";
  chevronUpElt.style.display = "block";
  searchElt.style.display = "block";
  filterLabelElt.style.display = "none";
}

function closeDropdownList(
  dropdownElt,
  dropdownUlElt,
  filterLabelElt,
  searchElt,
  chevronUpElt,
  chevronDownElt
) {
  dropdownUlElt.style.opacity = "0";
  dropdownElt.style.borderRadius = "5px";
  chevronDownElt.style.display = "block";
  chevronUpElt.style.display = "none";
  filterLabelElt.style.display = "block";
  searchElt.style.display = "none";
}

function navigateDropdown(
  chevronsElt,
  dropdownElt,
  dropdownUlElt,
  filterLabelElt,
  searchElt,
  chevronUpElt,
  chevronDownElt
) {
  let direction = false;
  chevronsElt.addEventListener("click", () => {
    if (direction === false) {
      openDropdownList(
        dropdownElt,
        dropdownUlElt,
        filterLabelElt,
        searchElt,
        chevronUpElt,
        chevronDownElt
      );
      direction = true;
    } else {
      closeDropdownList(
        dropdownElt,
        dropdownUlElt,
        filterLabelElt,
        searchElt,
        chevronUpElt,
        chevronDownElt
      );
      direction = false;
    }
  });
}

function navigateIngredientDropdown() {
  const dropdownIngredientUlElt = document.querySelector(
    ".ingredient .dropdown-ul"
  );
  const dropdownIngredientElt = document.querySelector(
    ".ingredient .dropdown-wrapper"
  );
  const chevronsIngredientElt = document.querySelector(".ingredient .chevrons");
  const filterIngredientLabelElt = document.querySelector(
    ".ingredient .dropdown-label"
  );
  const searchIngredientElt = document.querySelector(".ingredient .search");
  const chevronUpIngredientElt = document.querySelector(
    ".ingredient .bi-chevron-up"
  );
  const chevronDownIngredientElt = document.querySelector(
    ".ingredient .bi-chevron-down"
  );

  navigateDropdown(
    chevronsIngredientElt,
    dropdownIngredientElt,
    dropdownIngredientUlElt,
    filterIngredientLabelElt,
    searchIngredientElt,
    chevronUpIngredientElt,
    chevronDownIngredientElt
  );
}

function navigateApplianceDropdown() {
  const dropdownApplianceUlElt = document.querySelector(
    ".appliance .dropdown-ul"
  );
  const dropdownApplianceElt = document.querySelector(
    ".appliance .dropdown-wrapper"
  );
  const chevronsApplianceElt = document.querySelector(".appliance .chevrons");
  const filterApplianceLabelElt = document.querySelector(
    ".appliance .dropdown-label"
  );
  const searchApplianceElt = document.querySelector(".appliance .search");
  const chevronUpApplianceElt = document.querySelector(
    ".appliance .bi-chevron-up"
  );
  const chevronDownApplianceElt = document.querySelector(
    ".appliance .bi-chevron-down"
  );

  navigateDropdown(
    chevronsApplianceElt,
    dropdownApplianceElt,
    dropdownApplianceUlElt,
    filterApplianceLabelElt,
    searchApplianceElt,
    chevronUpApplianceElt,
    chevronDownApplianceElt
  );
}

function navigateUtensilDropdown() {
  const dropdownUtensilUlElt = document.querySelector(".utensil .dropdown-ul");
  const dropdownUtensilElt = document.querySelector(
    ".utensil .dropdown-wrapper"
  );
  const chevronsUtensilElt = document.querySelector(".utensil .chevrons");
  const filterUtensilLabelElt = document.querySelector(
    ".utensil .dropdown-label"
  );
  const searchUtensilElt = document.querySelector(".utensil .search");
  const chevronUpUtensilElt = document.querySelector(".utensil .bi-chevron-up");
  const chevronDownUtensilElt = document.querySelector(
    ".utensil .bi-chevron-down"
  );

  navigateDropdown(
    chevronsUtensilElt,
    dropdownUtensilElt,
    dropdownUtensilUlElt,
    filterUtensilLabelElt,
    searchUtensilElt,
    chevronUpUtensilElt,
    chevronDownUtensilElt
  );
}

navigateIngredientDropdown();
navigateApplianceDropdown();
navigateUtensilDropdown();
