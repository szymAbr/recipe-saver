import React, { useState } from "react";

function CategorySelector({ userCategories, setUserCategories, category, setCategory }) {
    const [newCategory, setNewCategory] = useState("");
    
    // selects category for this recipe
    function handleChange() {
        const categorySelector = document.getElementById("categories");
        setCategory(categorySelector.value);
    }
    
    // updates category array
    function handleSubmit(e) {
        e.preventDefault();
        
        userCategories.includes(newCategory) ?
            alert("You have already entered this category!") :
            setUserCategories([
                ...userCategories,
                newCategory
            ]);
            setNewCategory("");
    }
    
    return (
        <div className="select-category">
            <select id="categories" value={category} onChange={handleChange}>
                <option id="default-option" value="default-option">
                    ---Select a category---
                </option>
                {userCategories.map(cat => {
                    return (
                        <option key={cat} value={cat} className="category-item" id={cat}>
                            {cat}
                        </option>
                )})}
            </select>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={newCategory}
                    onChange={e => {setNewCategory(e.target.value)}}
                    placeholder="New category"
                    style={{width: "45%", height: "2px"}}
                />
                <button className="add-button">
                    ADD
                </button>
            </form>
        </div>
    )
}

export default CategorySelector;