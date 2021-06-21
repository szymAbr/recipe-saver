import React from "react";

function Header(props) {
  return (
    <div className="header">
      <button
        className="logout"
        onClick={() => {
          props.handleLogout();
        }}
      >
        Sign out
      </button>
      <h1>RECIPE SAVER</h1>
      <h4>Keep all your favorite recipes in one place!</h4>
    </div>
  );
}

export default Header;
