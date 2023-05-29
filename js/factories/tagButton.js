"use_strict";

/**
 * 
 * @param {object} liElt 
 */
function createTagBtn(liElt) {
    const spanTagElt = document.createElement("span");
    spanTagElt.setAttribute("class", "badge");

    const closeTagElt = document.createElement("i");
    closeTagElt.setAttribute("class", "bi bi-x-circle");
    spanTagElt.appendChild(closeTagElt);

    const btnTagElt = document.createElement("button");
    btnTagElt.setAttribute("class", "btn btn-primary");
    btnTagElt.textContent = liElt.textContent;

    const divTagElt = document.createElement("div");
    divTagElt.setAttribute("class", "ingredient-tag");
    
    const tagElts = document.querySelector(".tags");
    tagElts.appendChild(divTagElt);
    divTagElt.appendChild(btnTagElt);
    divTagElt.appendChild(spanTagElt);
    
    divTagElt.style.display = "block";
}
