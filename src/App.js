import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import "./App.css";
import Header from "./components/Header";
import RecipeCollection from "./components/RecipeCollection";
import Login from "./components/Login";

function App() {
  require ("firebase/auth");
  
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function clearInputs() {
    setEmail("");
    setPassword("");
  }

  function clearErrors() {
    setEmailError("");
    setPasswordError("");
  }

  function handleLogin() {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code) {
          case "auth/invalid-email" :
          case "auth/user-disabled" :
          case "auth/user-not-found" :
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  function handleSignup() {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code) {
          case "auth/email-already-in-use" :
          case "auth/invalid-email" :
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  function handleLogout() {
    firebase.auth().signOut();
  }

  useEffect(() => {
    function authListener() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          clearInputs();
          setUser(user);
        } else {
          setUser("");
        }
      })
    };
    authListener();
  }, [])

  useEffect(() => {
    setIsLoading(false);
  }, [])

  return (
    <div className="container">
      {
        isLoading ?
        <h3 className="col-3 loading">Loading...</h3> :
        user ?
        <div className="row">
          <Header handleLogout={handleLogout} />
          <RecipeCollection user={user} />
        </div> :
        <div className="row">
          <Login 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
          />
        </div>
      }
    </div>
  );
}

export default App;