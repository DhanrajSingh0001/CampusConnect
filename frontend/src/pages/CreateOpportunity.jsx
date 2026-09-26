import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateOpportunity() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/opportunities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to create opportunity ❌"
        );
        setLoading(false);
        return;
      }

      alert(
        "Opportunity created successfully ✅"
      );

      navigate("/opportunities");

    } catch (error) {
      console.error(error);
      alert(
        "Backend se connection nahi ho raha ❌"
      );
    }

    setLoading(false);
  };

  return (
    <div className="application-page">

      <div className="application-card">

        <h1>
          Create Opportunity 🚀
        </h1>

        <p className="auth-subtitle">
          Create a new career opportunity
        </p>

        <form onSubmit={handleSubmit}>

          <div className="application-input">

            <label>
              Opportunity Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Example: Frontend Developer Intern"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>

          <div className="application-input">

            <label>
              Company
            </label>

            <input
              type="text"
              name="company"
              placeholder="Example: Tech Solutions"
              value={formData.company}
              onChange={handleChange}
              required
            />

          </div>

          <div className="application-input">

            <label>
              Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Type
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Job">
                Job
              </option>

              <option value="Scholarship">
                Scholarship
              </option>

            </select>

          </div>

          <div className="application-input">

            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Example: Remote / Noida"
              value={formData.location}
              onChange={handleChange}
              required
            />

          </div>

          <div className="application-input">

            <label>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter opportunity description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />

          </div>

          <button
            type="submit"
            className="application-submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Opportunity →"}
          </button>

        </form>

        <button
          className="application-back"
          onClick={() =>
            navigate("/opportunities")
          }
        >
          ← Back to Opportunities
        </button>

      </div>

    </div>
  );
}

export default CreateOpportunity;