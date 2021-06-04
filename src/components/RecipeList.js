import React, { useState } from "react";
import RecipeElement from "./RecipeElement";
import RecipeEntryForm from "./RecipeEntryForm";
import RecipeListElements from "./RecipeListElements";

function RecipeList({ recipes, user }) {
    const [chosen, setChosen] = useState("");

    return (
        <div>
            <RecipeListElements recipes={recipes} user={user} setChosen={setChosen} />
            <RecipeElement recipes={recipes} chosen={chosen} />
            <RecipeEntryForm recipes={recipes} user={user} />
        </div>
    )
}

export default RecipeList;