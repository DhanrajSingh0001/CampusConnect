import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      // ================= SAVE LOGIN DATA =================

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage(
        "Login successful! Redirecting... ✅"
      );

      // ================= ROLE REDIRECT =================

      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 700);

    } catch (error) {
      console.error(error);

      setError(
        "Backend server se connection nahi ho raha."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ================= LEFT SIDE ================= */}

      <div className="auth-info">

        <div className="auth-brand">
          🎓 CampusConnect
        </div>

        <span className="section-label">
          WELCOME BACK
        </span>

        <h1>
          Continue your
          <br />
          <span>campus journey.</span>
        </h1>

        <p>
          Login to discover opportunities, campus
          events and study resources designed to
          help you grow.
        </p>

        <div className="auth-features">

          <div>
            <span>💼</span>
            <p>
              Discover career opportunities
            </p>
          </div>

          <div>
            <span>📅</span>
            <p>
              Stay updated with campus events
            </p>
          </div>

          <div>
            <span>📚</span>
            <p>
              Access study resources
            </p>
          </div>

        </div>

      </div>

      {/* ================= LOGIN CARD ================= */}

      <div className="auth-card">

        <div className="auth-card-header">

          <div className="auth-logo">
            🎓
          </div>

          <h2>
            Welcome Back 👋
          </h2>

          <p>
            Login to your CampusConnect account
          </p>

        </div>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <label>
              Password
            </label>

            <div className="password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in... ⏳"
              : "Login 🚀"}
          </button>

        </form>

        {/* ================= MESSAGE ================= */}

        {message && (
          <p className="auth-success">
            {message}
          </p>
        )}

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        {/* ================= SIGNUP ================= */}

        <p className="switch-auth">

          Don't have an account?{" "}

          <Link to="/signup">
            Create Account
          </Link>

        </p>

        {/* ================= HOME ================= */}

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;