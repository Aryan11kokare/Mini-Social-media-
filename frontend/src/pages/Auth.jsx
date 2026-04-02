import { useState } from "react";
import "./Auth.css";
import { clientServer } from "../config";

function AuthPage({ setAuth }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode !== "login") {
      const reponce = await clientServer.post("/signup", {
        username,
        email,
        password,
      });

      if (reponce?.error?.message === "Rejected") {
        setIsLoading(false);
        setErrors(reponce.payload.message);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setMode("login");
          setEmail("");
          setPassword("");
          setUsername("");
        }, 1000);
      }
    } else {
      const reponce = await clientServer.post("/login", {
        email,
        password,
      });

      if (reponce?.error?.message === "Rejected") {
        setIsLoading(false);
        setErrors(reponce.payload.message);
      } else {
        const token = reponce.data.token;
        localStorage.setItem("token", token);
        setTimeout(() => {
          setIsLoading(false);
          setAuth(true);
          setEmail("");
          setPassword("");
          setUsername("");
        }, 1000);
      }
    }
  };

  const handleToggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="form-content">
            <h1 className="brand-title">Socials</h1>
            <div className="toggle-tabs">
              <button
                className={`tab ${mode === "login" ? "active" : ""}`}
                onClick={() => setMode("login")}
              >
                Login
              </button>{" "}
              <div className="break"></div>
              <button
                className={`tab ${mode === "signup" ? "active" : ""}`}
                onClick={() => setMode("signup")}
              >
                Signup
              </button>
            </div>
            <div className="eroor">{errors}</div>
            <div className="auth-form">
              <form onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text "
                      name="username"
                      className=""
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Jon_doe"
                      required
                    />
                  </div>
                )}

                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text "
                    name="email"
                    className=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jon@gmail.com"
                    required
                  />
                </div>
                <div className="input-field passwordFiled">
                  <label className="" htmlFor="password">
                    Password
                  </label>
                  <input
                    type={showPassword === true ? "text" : "password"}
                    name="password"
                    className=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="• • • • • • • •"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="1"
                          y1="1"
                          x2="23"
                          y2="23"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Loading..."
                    : mode === "login"
                      ? "Login"
                      : "Sign Up"}
                </button>

                <p className="toggle-text">
                  {mode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={handleToggleMode}
                        className="link-button"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={handleToggleMode}
                        className="link-button"
                      >
                        Login
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
