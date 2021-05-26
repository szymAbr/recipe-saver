import React, { useState, useEffect } from "react";

function RecipeCategories({ recipes }) {
    const allCategories = recipes.map(recipe => {
        return recipe.category;
    })

    const uniqueCategories = [...new Set(allCategories)];
    
    return (
        <div className="listed-categories">
            {uniqueCategories.map(cat => {
                return (
                    <button key={cat} id={cat}>{cat}</button>
                )
            })}
        </div>
    )
}

export default RecipeCategories;