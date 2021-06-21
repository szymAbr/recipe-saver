import React from "react";

function RecipeCategories({ recipes, setCurrCat }) {
  const allCategories = recipes.map((recipe) => {
    return recipe.category;
  });

  const uniqueCategories = [...new Set(allCategories)];

  return (
    <div className="listed-categories">
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
