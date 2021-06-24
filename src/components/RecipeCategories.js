import React from "react";

function RecipeCategories({ recipes, setCurrCat }) {
  const allCategories = recipes.map((recipe) => {
    return recipe.category;
  });

  const uniqueCategories = [...new Set(allCategories)];

  // set default category to show all recipes
  function handleClick() {
    setCurrCat("");
  }

  return (
    <div style={{ marginBottom: "15px" }}>
      <button className="cat-btn" onClick={handleClick}>
        ALL RECIPES
      </button>
      {uniqueCategories.map((cat) => {
        return (
          <button
            key={cat}
            className="cat-btn"
            id={cat}
            onClick={() => setCurrCat(cat)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default RecipeCategories;
