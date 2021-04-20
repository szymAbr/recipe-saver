import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import RecipeSteps from "./RecipeSteps";
import RecipeIngredients from "./RecipeIngredients";

function RecipeEntryForm({ recipes, user }) {
    require ("firebase/storage");
    
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [ingredInput, setIngredInput] = useState("");
    const [steps, setSteps] = useState([]);
    const [stepInput, setStepInput] = useState("");
    const [recipeImg, setRecipeImg] = useState("");
    
    const titles = recipes.map(item => {
        return item.title;
    });
    
    function handleClick(e) {
        e.preventDefault();

        const time_minutes = parseInt(time);

        if (title === "" || time === "" || ingredients.length === 0 || steps.length === 0) {
            alert("Looks like you forgot about something!");
        } else {
            if (titles.includes(title)) {
                alert("You have already used that recipe title!")
            } else {
                firebase
                    .firestore()
                    .collection(`recipes of ${user.uid}`)
                    .add({
                        title,
                        time_minutes,
                        recipeImg,
                        ingredients,
                        steps
                    })
                    .then(() => {
                        setTitle("");
                        setTime("");
                        setRecipeImg("");
                        setIngredients([]);
                        setSteps([]);
                    });
            }
        }
    }

    function handleFile(e) {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`images of ${user.uid}/` + file.name);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then(url => {
                setRecipeImg(url);
                alert(`${file.name} has been uploaded.`);
            })
        })
    }

    useEffect(() => {
        setIngredInput("");
    }, [ingredients])

    useEffect(() => {
        setStepInput("");
    }, [steps])
    
    return (
        <div className="col-3 entry-form">
            <h3>Add a recipe!</h3>
            <input 
                type="text" 
                value={title} 
                onChange={e => (setTitle(e.target.value))}
                placeholder="Title"
            />
            <br />
            
            <input 
                type="number" 
                value={time}
                onChange={e => (setTime(e.target.value))}
                placeholder="Time needed [min]"
                style={{ marginBottom: "20px" }}
            />
            <br />
            
            <label>
                Choose an image for your recipe: <br />
                <input 
                    type="file" 
                    onChange={handleFile}
                />
            </label>

            <div className="ingreds-steps">
                <RecipeIngredients 
                    ingredients={ingredients} 
                    setIngredients={setIngredients} 
                    ingredInput={ingredInput} 
                    setIngredInput={setIngredInput} 
                />

                <RecipeSteps 
                    steps={steps}
                    setSteps={setSteps}
                    stepInput={stepInput}
                    setStepInput={setStepInput}
                />
            </div>

            <button onClick={handleClick} style={{ fontWeight: "800" }}>SAVE RECIPE</button>
        </div>
    )
}

export default RecipeEntryForm;