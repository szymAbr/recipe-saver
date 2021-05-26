import React, { useState } from "react";
import firebase from "../firebase";
import RecipeElement from "./RecipeElement";
import RecipeEntryForm from "./RecipeEntryForm";
import RecipeCategories from "./RecipeCategories";

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
    
    // create a function which evaluates whether number of recipes > X
    // OR the user has created > 1 group of recipes
    // and if true return a list of grouped elements
    return (
        <div>
            {
                recipes.length === 0 ?
                <h3 className="col-3 recipe-list" style={{ paddingTop: "13%" }}>You do not have any recipes yet :(</h3> :
                <div className="col-3 recipe-list">
                    <h3>Your recipes:</h3><br />
                    <RecipeCategories recipes={recipes} />
                    <ul>
                        {recipes.map(recipe => 
                            <li key={recipe.id} className="list-item" id={recipe.title} onClick={() => {setChosen(recipe)}}>
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