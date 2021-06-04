import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebase";
import RecipeList from "./RecipeList";

function RecipeCollection({ user }) {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isMounted = useRef(false);
    
    // fetches current user's recipes from the database
    useEffect(() => {
        const fetchData = () => {
            firebase
                .firestore()
                .collection(`recipes of ${user.uid}`)
                .onSnapshot(snapshot => {
                    const newRecipes = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    if (isMounted.current) {
                        setRecipes(newRecipes);
                        setIsLoading(false);
                    }
                });
        };
        isMounted.current = true;
        fetchData();
        return () => (isMounted.current = false);
    }, [user.uid]);

    return (
        <div>
            {
                isLoading ?
                <h3 className="col-3 loading">Loading...</h3> :
                <RecipeList recipes={recipes} user={user}/>
            }
        </div>
    )
}

export default RecipeCollection;