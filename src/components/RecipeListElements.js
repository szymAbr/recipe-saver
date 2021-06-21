import React, { useState } from "react";
import RecipeCategories from "./RecipeCategories";
import firebase from "../firebase";

function RecipeListElements({ recipes, user, setChosen }) {
  const [currCat, setCurrCat] = useState("");

  function deleteRecipe(recipe) {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      firebase
        .firestore()
        .doc(`recipes of ${user.uid}/` + recipe.id)
        .delete();
    } else {
      console.log("recipe not deleted");
    }
  }

  function checkCategory(recipes) {
    return recipes.category === currCat;
  }

  // provides a new array of recipes, based on the selected category
  const singleCategory = recipes.filter(checkCategory);

  return recipes.length === 0 ? (
    <h3 className="col-3 recipe-list" style={{ paddingTop: "13%" }}>
      You do not have any recipes yet :(
    </h3>
  ) : (
    <div className="col-3 recipe-list">
      <h3>Your recipes:</h3>
      <br />
      <RecipeCategories recipes={recipes} setCurrCat={setCurrCat} />
      <ul>
        {currCat === ""
          ? recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="list-item"
                id={recipe.title}
                onClick={() => setChosen(recipe)}
              >
                <h4 className="recipe-title">{recipe.title}</h4>
                <p className="recipe-time">{recipe.time_minutes} min</p>
                <button
                  className="delete-button"
                  onClick={() => deleteRecipe(recipe)}
                >
                  DELETE
                </button>
              </li>
            ))
          : singleCategory.map((recipe) => (
              <li
                key={recipe.id}
                className="list-item"
                id={recipe.title}
                onClick={() => setChosen(recipe)}
              >
                <h4 className="recipe-title">{recipe.title}</h4>
                <p className="recipe-time">{recipe.time_minutes} min</p>
                <button
                  className="delete-button"
                  onClick={() => deleteRecipe(recipe)}
                >
                  DELETE
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default RecipeListElements;
