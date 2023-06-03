// ingredient filter elements
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

// appliance filter elements
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

// utensil filter elements
const dropdownUtensilUlElt = document.querySelector(".utensil .dropdown-ul");
const dropdownUtensilElt = document.querySelector(".utensil .dropdown-wrapper");
const chevronsUtensilElt = document.querySelector(".utensil .chevrons");
const filterUtensilLabelElt = document.querySelector(
  ".utensil .dropdown-label"
);
const searchUtensilElt = document.querySelector(".utensil .search");
const chevronUpUtensilElt = document.querySelector(".utensil .bi-chevron-up");
const chevronDownUtensilElt = document.querySelector(
  ".utensil .bi-chevron-down"
);

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

function navigateIngredientDropdown() {
  let direction = false;
  chevronsIngredientElt.addEventListener("click", () => {
    if (direction === false) {
      openDropdownList(
        dropdownIngredientElt,
        dropdownIngredientUlElt,
        filterIngredientLabelElt,
        searchIngredientElt,
        chevronUpIngredientElt,
        chevronDownIngredientElt
      );
      direction = true;
    } else {
      closeDropdownList(
        dropdownIngredientElt,
        dropdownIngredientUlElt,
        filterIngredientLabelElt,
        searchIngredientElt,
        chevronUpIngredientElt,
        chevronDownIngredientElt
      );
      direction = false;
    }
  });
}

function navigateApplianceDropdown() {
  let direction = false;
  chevronsApplianceElt.addEventListener("click", () => {
    if (direction === false) {
      openDropdownList(
        dropdownApplianceElt,
        dropdownApplianceUlElt,
        filterApplianceLabelElt,
        searchApplianceElt,
        chevronUpApplianceElt,
        chevronDownApplianceElt
      );
      direction = true;
    } else {
      closeDropdownList(
        dropdownApplianceElt,
        dropdownApplianceUlElt,
        filterApplianceLabelElt,
        searchApplianceElt,
        chevronUpApplianceElt,
        chevronDownApplianceElt
      );
      direction = false;
    }
  });
}

function navigateUtensilDropdown() {
  let direction = false;
  chevronsUtensilElt.addEventListener("click", () => {
    if (direction === false) {
      openDropdownList(
        dropdownUtensilElt,
        dropdownUtensilUlElt,
        filterUtensilLabelElt,
        searchUtensilElt,
        chevronUpUtensilElt,
        chevronDownUtensilElt
      );
      direction = true;
    } else {
      closeDropdownList(
        dropdownUtensilElt,
        dropdownUtensilUlElt,
        filterUtensilLabelElt,
        searchUtensilElt,
        chevronUpUtensilElt,
        chevronDownUtensilElt
      );
      direction = false;
    }
  });
}

navigateIngredientDropdown();
navigateApplianceDropdown();
navigateUtensilDropdown();
