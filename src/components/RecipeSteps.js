import React from "react";

function RecipeSteps(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.steps.includes(props.stepInput)
      ? alert("You have already entered this step!")
      : props.setSteps([...props.steps, props.stepInput]);
  }

  function handleDelete(e) {
    const checkForDeletion = (item) => {
      return item !== e.target.value;
    };

    props.setSteps(props.steps.filter(checkForDeletion));
  }

  return (
    <div className="steps">
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Describe the steps of tasty magic:</h4>
          <input
            type="text"
            value={props.stepInput}
            maxLength="200"
            onChange={(e) => props.setStepInput(e.target.value)}
            placeholder="next step"
          />
          <button className="add-button">ADD</button>
        </label>
      </form>
      <ol>
        {props.steps.map((step) => (
          <div key={step}>
            <li>{step}</li>
            <button
              className="delete-button"
              value={step}
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default RecipeSteps;
