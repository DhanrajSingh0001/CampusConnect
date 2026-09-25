import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Events load nahi ho pa rahe hain ❌"
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete event"
        );
        return;
      }

      setEvents((previousEvents) =>
        previousEvents.filter(
          (event) => event._id !== id
        )
      );

      alert(
        "Event deleted successfully ✅"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong ❌"
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="admin-page">

        <div className="admin-loading">

          <div className="admin-loading-icon">
            📅
          </div>

          <h2>
            Loading Events...
          </h2>

          <p>
            Please wait a moment ⏳
          </p>

        </div>

      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="admin-page">

        <div className="admin-error-card">

          <div className="admin-error-icon">
            ⚠️
          </div>

          <h1>
            Unable to Load Events
          </h1>

          <p>
            {error}
          </p>

          <button
            className="admin-primary-btn"
            onClick={() =>
              navigate("/admin")
            }
          >
            ← Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* ================= HEADER ================= */}

      <div className="admin-header">

        <div>

          <span className="admin-label">
            EVENT MANAGEMENT
          </span>

          <h1>
            Manage Events 📅
          </h1>

          <p>
            View, create and manage CampusConnect
            events.
          </p>

        </div>

        <div className="admin-header-actions">

          <button
            className="admin-secondary-btn"
            onClick={() =>
              navigate("/admin")
            }
          >
            ← Dashboard
          </button>

          <button
            className="admin-primary-btn"
            onClick={() =>
              navigate("/create-event")
            }
          >
            + Create Event
          </button>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="events-summary">

        <div className="events-summary-icon">
          📅
        </div>

        <div>
          <span>
            Total Campus Events
          </span>

          <h2>
            {events.length}
          </h2>
        </div>

      </div>

      {/* ================= EVENTS ================= */}

      {events.length === 0 ? (

        <div className="admin-empty-card">

          <div>
            📅
          </div>

          <h2>
            No Events Found
          </h2>

          <p>
            Create your first campus event
            to get started.
          </p>

          <button
            className="admin-primary-btn"
            onClick={() =>
              navigate("/create-event")
            }
          >
            + Create Event
          </button>

        </div>

      ) : (

        <div className="manage-events-grid">

          {events.map((event) => (

            <div
              className="manage-event-card"
              key={event._id}
            >

              {/* Card Header */}

              <div className="manage-event-header">

                <div className="manage-event-icon">
                  🎉
                </div>

                <span className="manage-event-badge">
                  CAMPUS EVENT
                </span>

              </div>

              {/* Content */}

              <h2>
                {event.title}
              </h2>

              <div className="manage-event-info">

                <div>
                  <span>
                    📅 Date
                  </span>

                  <strong>
                    {event.date}
                  </strong>
                </div>

                <div>
                  <span>
                    📍 Location
                  </span>

                  <strong>
                    {event.location}
                  </strong>
                </div>

              </div>

              <p className="manage-event-description">
                {event.description}
              </p>

              {/* Actions */}

              <div className="manage-event-actions">

                <button
                  className="manage-event-view-btn"
                  onClick={() =>
                    navigate(
                      "/event-details",
                      {
                        state: { event },
                      }
                    )
                  }
                >
                  View Details →
                </button>

                <button
                  className="manage-event-delete-btn"
                  onClick={() =>
                    deleteEvent(event._id)
                  }
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ManageEvents;