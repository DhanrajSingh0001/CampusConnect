import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // ================= PASSWORD VALIDATION =================

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to create account."
        );
        return;
      }

      setMessage(
        "Account created successfully! Redirecting... ✅"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
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
          JOIN CAMPUSCONNECT
        </span>

        <h1>
          Start your
          <br />
          <span>campus journey.</span>
        </h1>

        <p>
          Create your account and get access to
          campus events, career opportunities and
          useful study resources.
        </p>

        <div className="auth-features">

          <div>
            <span>🚀</span>
            <p>
              Build your career
            </p>
          </div>

          <div>
            <span>🎯</span>
            <p>
              Discover new opportunities
            </p>
          </div>

          <div>
            <span>📚</span>
            <p>
              Learn and grow
            </p>
          </div>

        </div>

      </div>

      {/* ================= SIGNUP CARD ================= */}

      <div className="auth-card">

        <div className="auth-card-header">

          <div className="auth-logo">
            🎓
          </div>

          <h2>
            Create Account 🚀
          </h2>

          <p>
            Join the CampusConnect community
          </p>

        </div>

        <form onSubmit={handleSignup}>

          {/* ================= NAME ================= */}

          <div className="input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          {/* ================= EMAIL ================= */}

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

          {/* ================= PASSWORD ================= */}

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
                placeholder="Create a password"
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

            <small className="password-hint">
              Minimum 6 characters
            </small>

          </div>

          {/* ================= CONFIRM PASSWORD ================= */}

          <div className="input-group">

            <label>
              Confirm Password
            </label>

            <div className="password-wrapper">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "🙈"
                  : "👁️"}
              </button>

            </div>

          </div>

          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account... ⏳"
              : "Create Account 🚀"}
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

        {/* ================= LOGIN ================= */}

        <p className="switch-auth">

          Already have an account?{" "}

          <Link to="/login">
            Login
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

export default Signup;