"use_strict";

/**
 * 
 * @param {object} liElt 
 */
function createTagBtn(liElt, buttonType, filter) {
    const spanTagElt = document.createElement("span");
    spanTagElt.setAttribute("class", "badge");

    const closeTagElt = document.createElement("i");
    closeTagElt.setAttribute("class", "bi bi-x-circle");
    spanTagElt.appendChild(closeTagElt);

    const btnTagElt = document.createElement("button");
    btnTagElt.setAttribute("class", buttonType);
    btnTagElt.textContent = liElt.textContent;

    const divTagElt = document.createElement("div");
    divTagElt.setAttribute("class", `${filter}-tag`);
    
    const tagElts = document.querySelector(".tags");
    tagElts.appendChild(divTagElt);
    divTagElt.appendChild(btnTagElt);
    divTagElt.appendChild(spanTagElt);
    
    divTagElt.style.display = "block";
}
