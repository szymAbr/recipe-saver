import React from "react";

function RecipeElement(props) {
    const chosen = props.chosen;

    return (
        <div className="col-6 recipe-element">
            {chosen === "" ?
            <h3 style={{ padding: "25%" }}>Select a recipe and we're ready to go!</h3> :
            <div>
                <h2>{chosen.title}</h2>
                <img src={chosen.recipeImg} alt="Ready meal" />
                <p>Time: {chosen.time_minutes} min</p>
                <ul className="rec-elem-list">
                    {chosen.ingredients.map(ingred =>
                        <li key={ingred}>{ingred}</li>
                    )}
                </ul>
                <ol className="rec-elem-list">
                    {chosen.steps.map(step =>
                        <li key={step}>{step}</li>
                    )}
                </ol>
            </div>
            }
        </div>
    )
}

export default RecipeElement;