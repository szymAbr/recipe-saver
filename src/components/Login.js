import React from "react";

function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    handleLogin,
    handleSignup,
  } = props;

  function handleSubmit(e) {
    e.preventDefault();

    hasAccount ? handleLogin() : handleSignup();
  }

  return (
    <div className="col-4 login">
      <form onSubmit={handleSubmit}>
        <label className="login-label">
          Username (email address):
          <br />
          <input
            type="email"
            value={email}
            required
            autoFocus
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <p>{emailError}</p>

        <label className="login-label">
          Password:
          <br />
          <input
            type="password"
            value={password}
            required
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <p>{passwordError}</p>

        <div className="button-container">
          {hasAccount ? (
            <div>
              <button>Sign in</button>
              <p className="has-account">
                Don't have an account yet?
                <span
                  className="sign-in-up"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  {" "}
                  Sign up
                </span>
              </p>
            </div>
          ) : (
            <div>
              <button>Sign up</button>
              <p className="has-account">
                Already have an account?
                <span
                  className="sign-in-up"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  {" "}
                  Sign in
                </span>
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
