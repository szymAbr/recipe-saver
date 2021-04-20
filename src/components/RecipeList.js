import React, { useState } from "react";
import RecipeElement from "./RecipeElement";
import RecipeEntryForm from "./RecipeEntryForm";
import firebase from "../firebase";

function RecipeList({ recipes, user }) {
    const [chosen, setChosen] = useState("");

    function deleteRecipe(recipe) {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            firebase
                .firestore()
                .doc(`recipes of ${user.uid}/` + recipe.id)
                .delete()
        } else {
            console.log("recipe not deleted");
        }
    }
    
    return (
        <div>
            {
                recipes.length === 0 ?
                <h3 className="col-3 recipe-list" style={{ paddingTop: "13%" }}>You do not have any recipes yet :(</h3> :
                <div className="col-3 recipe-list">
                    <h3>Your recipes:</h3><br />
                    <ul>
                        {recipes.map(recipe => 
                            <li key={recipe.id} className="list-item" onClick={() => {setChosen(recipe)}}>
                                <h4 className="recipe-title">{recipe.title}</h4>
                                <p className="recipe-time">{recipe.time_minutes} min</p>
                                <button className="delete-button" onClick={() => deleteRecipe(recipe)}>DELETE</button>
                            </li>
                        )}
                    </ul>
                </div>
            }
            <RecipeElement recipes={recipes} chosen={chosen} />
            <RecipeEntryForm recipes={recipes} user={user} />
        </div>
    )
}

export default RecipeList;