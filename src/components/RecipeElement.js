import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function RecipeElement(props) {
  const [imgUrl, setImgUrl] = useState("");

  const chosen = props.chosen;

  // default image (by Дарья Яковлева, from Pixabay) set if no file provided
  useEffect(() => {
    chosen.recipeImg
      ? setImgUrl(chosen.recipeImg)
      : firebase
          .storage()
          .ref()
          .child("default-picture.jpg")
          .getDownloadURL()
          .then((url) => setImgUrl(url));
  }, [chosen.recipeImg]);

  return (
    <div className="col-6 recipe-element">
      {chosen === "" ? (
        <h3 style={{ padding: "25%" }}>
          Select a recipe and we're ready to go!
        </h3>
      ) : (
        <div>
          <h2>{chosen.title}</h2>
          <img src={imgUrl} alt="Ready meal" />
          <p>Time: {chosen.time_minutes} min</p>
          <ul className="rec-elem-list">
            {chosen.ingredients.map((ingred) => (
              <li key={ingred}>{ingred}</li>
            ))}
          </ul>
          <ol className="rec-elem-list">
            {chosen.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default RecipeElement;
