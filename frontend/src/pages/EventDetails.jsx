import { useLocation, useNavigate } from "react-router-dom";

function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state?.event;

  if (!event) {
    return (
      <div className="event-details">
        <div className="event-not-found">
          <div className="event-not-found-icon">📅</div>

          <h1>Event Not Found</h1>

          <p>
            The event you are looking for could not be
            found or may no longer be available.
          </p>

          <button
            onClick={() => navigate("/events")}
          >
            ← Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details">

      {/* Back Button */}

      <button
        className="event-details-back"
        onClick={() => navigate("/events")}
      >
        ← Back to Events
      </button>

      {/* Main Card */}

      <div className="event-details-card">

        {/* Header */}

        <div className="event-details-header">

          <div className="event-details-icon">
            🎉
          </div>

          <div>
            <span className="event-details-badge">
              CAMPUS EVENT
            </span>

            <h1>{event.title}</h1>

            <p>
              Join us and be part of this exciting
              campus event.
            </p>
          </div>

        </div>

        {/* Event Information */}

        <div className="event-details-info">

          <div className="event-detail-item">

            <div className="event-detail-icon">
              📅
            </div>

            <div>
              <span>Date</span>
              <strong>{event.date}</strong>
            </div>

          </div>

          <div className="event-detail-item">

            <div className="event-detail-icon">
              📍
            </div>

            <div>
              <span>Location</span>
              <strong>{event.location}</strong>
            </div>

          </div>

        </div>

        {/* Description */}

        <div className="event-description-section">

          <h2>About This Event</h2>

          <p>
            {event.description}
          </p>

        </div>

        {/* Action */}

        <div className="event-details-actions">

          <button
            className="event-details-primary-btn"
            onClick={() => navigate("/events")}
          >
            Explore More Events →
          </button>

        </div>

      </div>
    </div>
  );
}

export default EventDetails;