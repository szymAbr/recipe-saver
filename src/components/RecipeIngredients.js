import React from "react";

function RecipeIngredients(props) {
  function handleSubmit(e) {
    e.preventDefault();

    const ingredient = props.ingredInput;

    props.ingredients.includes(ingredient)
      ? alert("You have already entered this ingredient!")
      : props.setIngredients([...props.ingredients, ingredient]);
  }

  function handleDelete(e) {
    const checkForDeletion = (item) => {
      return item !== e.target.value;
    };

    props.setIngredients(props.ingredients.filter(checkForDeletion));
  }

  return (
    <div className="ingredients">
      <form onSubmit={handleSubmit}>
        <label>
          <h4>List the ingredients:</h4>
          <input
            type="text"
            value={props.ingredInput}
            maxLength="60"
            onChange={(e) => props.setIngredInput(e.target.value)}
            placeholder="next ingredient"
            className="ingr-input"
          />
          <button className="add-button">ADD</button>
        </label>
      </form>
      <ul>
        {props.ingredients.map((ingred) => (
          <div key={ingred}>
            <li>{ingred}</li>
            <button
              className="delete-button"
              value={ingred}
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default RecipeIngredients;
