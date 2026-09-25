import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/events"
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Failed to load events."
          );
          return;
        }

        setEvents(data);
      } catch (error) {
        console.error(error);
        setError(
          "Backend server se connection nahi ho raha."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}`,
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
          data.message || "Failed to delete event."
        );
        return;
      }

      setEvents((previousEvents) =>
        previousEvents.filter(
          (event) => event._id !== eventId
        )
      );

      alert("Event deleted successfully ✅");
    } catch (error) {
      console.error(error);

      alert(
        "Backend server se connection nahi ho raha."
      );
    }
  };

  const locations = [
    ...new Set(
      events.map((event) => event.location)
    ),
  ];

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      event.title
        ?.toLowerCase()
        .includes(searchText) ||
      event.location
        ?.toLowerCase()
        .includes(searchText) ||
      event.description
        ?.toLowerCase()
        .includes(searchText);

    const matchesLocation =
      locationFilter === "All" ||
      event.location === locationFilter;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="events-page">

      {/* ================= HEADER ================= */}

      <div className="events-header">

        <div>
          <span className="section-label">
            CAMPUS ACTIVITIES
          </span>

          <h1>Campus Events 📅</h1>

          <p>
            Discover workshops, hackathons, seminars
            and exciting events happening around you.
          </p>
        </div>

        {user?.role === "admin" && (
          <button
            className="create-event-btn"
            onClick={() => navigate("/create-event")}
          >
            + Create Event
          </button>
        )}

      </div>

      {/* ================= FILTERS ================= */}

      <div className="event-filters">

        <input
          type="text"
          placeholder="🔎 Search events..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={locationFilter}
          onChange={(e) =>
            setLocationFilter(e.target.value)
          }
        >
          <option value="All">
            All Locations
          </option>

          {locations.map((location) => (
            <option
              key={location}
              value={location}
            >
              {location}
            </option>
          ))}
        </select>

        {(search || locationFilter !== "All") && (
          <button
            className="clear-event-filter"
            onClick={() => {
              setSearch("");
              setLocationFilter("All");
            }}
          >
            Clear Filters
          </button>
        )}

      </div>

      {/* ================= RESULT COUNT ================= */}

      {!loading && !error && (
        <div className="event-result-count">
          Showing{" "}
          <strong>{filteredEvents.length}</strong>{" "}
          of <strong>{events.length}</strong> events
        </div>
      )}

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="events-message">
          <div className="loading-icon">⏳</div>
          <h3>Loading Events...</h3>
          <p>Please wait while we fetch the latest events.</p>
        </div>
      )}

      {/* ================= ERROR ================= */}

      {!loading && error && (
        <div className="events-message error-message">
          <div className="loading-icon">❌</div>
          <h3>Something went wrong</h3>
          <p>{error}</p>

          <button
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {/* ================= NO EVENTS ================= */}

      {!loading &&
        !error &&
        filteredEvents.length === 0 && (
          <div className="events-message">

            <div className="loading-icon">
              📭
            </div>

            <h3>No Events Found</h3>

            <p>
              Try changing your search or filters.
            </p>

            {(search ||
              locationFilter !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setLocationFilter("All");
                }}
              >
                Clear Filters
              </button>
            )}

          </div>
        )}

      {/* ================= EVENTS GRID ================= */}

      {!loading &&
        !error &&
        filteredEvents.length > 0 && (
          <div className="events-grid">

            {filteredEvents.map((event) => (
              <div
                className="event-card"
                key={event._id}
              >

                <div className="event-card-top">
                  <span className="event-icon">
                    📅
                  </span>

                  <span className="event-badge">
                    Campus Event
                  </span>
                </div>

                <h2>{event.title}</h2>

                <div className="event-info">

                  <p>
                    📅{" "}
                    <strong>Date:</strong>{" "}
                    {event.date}
                  </p>

                  <p>
                    📍{" "}
                    <strong>Location:</strong>{" "}
                    {event.location}
                  </p>

                </div>

                <p className="event-description">
                  {event.description}
                </p>

                <div className="event-actions">

                  <button
                    className="view-event-btn"
                    onClick={() =>
                      navigate("/event-details", {
                        state: {
                          event: event,
                        },
                      })
                    }
                  >
                    View Details →
                  </button>

                  {user?.role === "admin" && (
                    <button
                      className="delete-event-btn"
                      onClick={() =>
                        handleDelete(event._id)
                      }
                    >
                      🗑️ Delete
                    </button>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

    </div>
  );
}

export default Events;