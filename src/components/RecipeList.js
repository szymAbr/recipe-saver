import React, { useState } from "react";
import RecipeElement from "./RecipeElement";
import RecipeEntryForm from "./RecipeEntryForm";
import RecipeListElements from "./RecipeListElements";

function RecipeList({ recipes, user }) {
    const [chosen, setChosen] = useState("");
    
    // create a function which evaluates whether number of recipes > X
    // OR the user has created > 1 group of recipes
    // and if true return a list of grouped elements
    return (
        <div>
            <RecipeListElements recipes={recipes} user={user} setChosen={setChosen} />
            <RecipeElement recipes={recipes} chosen={chosen} />
            <RecipeEntryForm recipes={recipes} user={user} />
        </div>
    )
}

export default RecipeList;