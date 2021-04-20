import React, {useState, useEffect} from "react";
import firebase from "../firebase";
import RecipeList from "./RecipeList";

function RecipeCollection({ user }) {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        firebase
            .firestore()
            .collection(`recipes of ${user.uid}`)
            .onSnapshot(snapshot => {
                const newRecipes = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setRecipes(newRecipes);
            })
    }, [recipes, user.uid])

    return (
        <div>
            <RecipeList recipes={recipes} user={user}/>
        </div>
    )
}

export default RecipeCollection;