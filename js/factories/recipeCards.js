"use_strict";

function addColDiv(colDivElt, rowCardElt) {
    colDivElt.setAttribute("class","col");
    rowCardElt.appendChild(colDivElt);
}

function addCardDiv(cardDivElt, colDivElt) {
    cardDivElt.setAttribute("class","card h-100");
    colDivElt.appendChild(cardDivElt);
}

function addCardHeaderDiv(cardHeaderDivElt, cardDivElt) {
    cardHeaderDivElt.setAttribute("class","card-header");
    cardDivElt.appendChild(cardHeaderDivElt);
}

function addRecipeImg(recipeImgElt, cardHeaderDivElt) {
    cardHeaderDivElt.appendChild(recipeImgElt);
}

function addCardBodyDiv(cardBodyDivElt, cardDivElt) {
    cardBodyDivElt.setAttribute("class","card-body");
    cardDivElt.appendChild(cardBodyDivElt);
}

function addHeaderCardBody(headerCardBodyElt, cardBodyDivElt) {
    cardBodyDivElt.appendChild(headerCardBodyElt);
}

function addRecipeName(recipeNameElt, headerCardBodyElt, name) {
    recipeNameElt.textContent = name;
    headerCardBodyElt.appendChild(recipeNameElt);
}

function addRecipeTime(recipeTimeElt, clockElt, headerCardBodyElt, time) {
    clockElt.setAttribute("class","bi bi-clock");
    recipeTimeElt.textContent = time + ` min`;
    headerCardBodyElt.appendChild(clockElt).appendChild(recipeTimeElt);
}

function createRecipeAndDescriptionDiv(recipeAndDescriptionDivElt, cardBodyDivElt) {
    recipeAndDescriptionDivElt.setAttribute("class","recipe-description");
    cardBodyDivElt.appendChild(recipeAndDescriptionDivElt);
}

function addRecipesDiv(recipesUlElt, recipeAndDescriptionDivElt) {
    recipesUlElt.setAttribute("class","recipes");
    recipeAndDescriptionDivElt.appendChild(recipesUlElt);
}

function addRecipesLi(recipesUlElt, ingredients) {
    ingredients.forEach(ingredient => {
        const recipesLiELt = document.createElement("li");
        const nameIngredientElt = document.createElement("b");
        recipesLiELt.appendChild(nameIngredientElt);
        nameIngredientElt.textContent = ingredient.ingredient;

        if (ingredient.unit) {
            const quantityElt = document.createTextNode(" : " + ingredient.quantity  + ` ` + ingredient.unit);
            recipesLiELt.appendChild(quantityElt);
        } else if (ingredient.quantity) {
            const quantityElt = document.createTextNode(" : " + ingredient.quantity);
            recipesLiELt.appendChild(quantityElt);
        }
        
        recipesUlElt.appendChild(recipesLiELt);
    });
}

function addRecipeDescription(recipeDescriptionElt, recipeAndDescriptionDivElt, description) {
    recipeDescriptionElt.textContent = description;
    recipeAndDescriptionDivElt.appendChild(recipeDescriptionElt);
}

function recipeCardsFactory(recipe) {
    const rowCardElt = document.querySelector(".row-card");
    const colDivElt = document.createElement("div");
    const cardDivElt = document.createElement("div");
    const cardHeaderDivElt = document.createElement("div");
    const recipeImgElt = document.createElement("img");
    const cardBodyDivElt = document.createElement("div");
    const headerCardBodyElt = document.createElement("header");
    const recipeNameElt = document.createElement("h3");
    const recipeTimeElt = document.createElement("b");
    const clockElt = document.createElement("i");
    const recipeAndDescriptionDivElt = document.createElement("div");
    const recipesUlElt = document.createElement("ul");
    const recipeDescriptionElt = document.createElement("p");
    
        function getRecipeDOM() {
            addColDiv(colDivElt, rowCardElt);
            addCardDiv(cardDivElt, colDivElt);
            addCardHeaderDiv(cardHeaderDivElt, cardDivElt);
            addRecipeImg(recipeImgElt, cardHeaderDivElt);
            addCardBodyDiv(cardBodyDivElt, cardDivElt);
            addHeaderCardBody(headerCardBodyElt, cardBodyDivElt);
            addRecipeName(recipeNameElt, headerCardBodyElt, recipe.name);
            addRecipeTime(recipeTimeElt, clockElt, headerCardBodyElt, recipe.time);
            createRecipeAndDescriptionDiv(recipeAndDescriptionDivElt, cardBodyDivElt);
            addRecipesDiv(recipesUlElt, recipeAndDescriptionDivElt);
            addRecipesLi(recipesUlElt, recipe.ingredients);
            addRecipeDescription(recipeDescriptionElt, recipeAndDescriptionDivElt, recipe.description);

            return (rowCardElt);
        }
        
    return { getRecipeDOM }
}