import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateResource() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");

      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/resources",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            category,
            level,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to create resource."
        );

        return;
      }

      setMessage(
        "Resource created successfully! ✅"
      );

      setTitle("");
      setCategory("");
      setLevel("Beginner");
      setDescription("");

      setTimeout(() => {
        navigate("/resources");
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
    <div className="create-page">

      <div className="create-card">

        {/* ================= HEADER ================= */}

        <div className="create-header">

          <span className="section-label">
            ADMIN PANEL
          </span>

          <h1>
            Create Resource 📚
          </h1>

          <p>
            Add a new study resource for students.
          </p>

        </div>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>

          {/* TITLE */}

          <div className="input-group">

            <label>
              Resource Title
            </label>

            <input
              type="text"
              placeholder="e.g. Java Programming Notes"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>

          {/* CATEGORY */}

          <div className="input-group">

            <label>
              Category
            </label>

            <input
              type="text"
              placeholder="e.g. Programming"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              required
            />

          </div>

          {/* LEVEL */}

          <div className="input-group">

            <label>
              Difficulty Level
            </label>

            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value)
              }
              required
            >
              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>
            </select>

          </div>

          {/* DESCRIPTION */}

          <div className="input-group">

            <label>
              Description
            </label>

            <textarea
              placeholder="Write a short description about this resource..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows="7"
              required
            />

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="create-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Resource... ⏳"
              : "Create Resource 🚀"}
          </button>

        </form>

        {/* ================= MESSAGE ================= */}

        {message && (
          <p className="create-success">
            {message}
          </p>
        )}

        {error && (
          <p className="create-error">
            {error}
          </p>
        )}

        {/* ================= BACK ================= */}

        <button
          type="button"
          className="create-back-btn"
          onClick={() =>
            navigate("/resources")
          }
        >
          ← Back to Resources
        </button>

      </div>

    </div>
  );
}

export default CreateResource;