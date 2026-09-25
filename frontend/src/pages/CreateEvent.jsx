import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const [message, setMessage] = useState("");
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
      setMessage("Please login first ❌");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create event ❌");
        setLoading(false);
        return;
      }

      setMessage("Event created successfully ✅");

      setFormData({
        title: "",
        date: "",
        location: "",
        description: "",
      });

      setTimeout(() => {
        navigate("/events");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Backend se connection nahi ho raha ❌");
    }

    setLoading(false);
  };

  return (
    <div className="application-page">
      <div className="application-card">

        <h1>Create Event 🎉</h1>

        <p className="auth-subtitle">
          Create a new campus event
        </p>

        <form onSubmit={handleSubmit}>

          <div className="application-input">
            <label>Event Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="application-input">
            <label>Date</label>

            <input
              type="text"
              name="date"
              placeholder="Example: 25 September 2026"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="application-input">
            <label>Location</label>

            <input
              type="text"
              name="location"
              placeholder="Example: Main Auditorium"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="application-input">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter event description"
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
            {loading ? "Creating..." : "Create Event →"}
          </button>

        </form>

        {message && (
          <p style={{ textAlign: "center", marginTop: "15px" }}>
            {message}
          </p>
        )}

        <button
          className="application-back"
          onClick={() => navigate("/events")}
        >
          ← Back to Events
        </button>

      </div>
    </div>
  );
}

export default CreateEvent;