import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH APPLICATIONS =================

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/applications/my",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Failed to load applications."
          );
          return;
        }

        setApplications(data);
      } catch (error) {
        console.error(error);

        setError(
          "Backend server se connection nahi ho raha."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ================= STATUS CLASS =================

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "status-accepted";

      case "Rejected":
        return "status-rejected";

      case "Shortlisted":
        return "status-shortlisted";

      case "Under Review":
        return "status-review";

      default:
        return "status-applied";
    }
  };

  return (
    <div className="student-dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div>
          <p className="section-label">
            STUDENT PORTAL
          </p>

          <h1>
            Welcome, {user?.name || "Student"} 👋
          </h1>

          <p>
            Explore your campus, discover opportunities
            and grow your career.
          </p>
        </div>

        <button
          className="dashboard-logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

      {/* ================= DASHBOARD CARDS ================= */}

      <div className="dashboard-grid">

        {/* EVENTS */}

        <div
          className="dashboard-card"
          onClick={() => navigate("/events")}
        >
          <div className="dashboard-icon">
            📅
          </div>

          <h2>
            Campus Events
          </h2>

          <p>
            Discover workshops, hackathons, seminars
            and college events.
          </p>

          <span>
            Explore Events →
          </span>
        </div>

        {/* OPPORTUNITIES */}

        <div
          className="dashboard-card"
          onClick={() =>
            navigate("/opportunities")
          }
        >
          <div className="dashboard-icon">
            💼
          </div>

          <h2>
            Opportunities
          </h2>

          <p>
            Find internships, jobs and scholarships
            for your career.
          </p>

          <span>
            Explore Opportunities →
          </span>
        </div>

        {/* RESOURCES */}

        <div
          className="dashboard-card"
          onClick={() =>
            navigate("/resources")
          }
        >
          <div className="dashboard-icon">
            📚
          </div>

          <h2>
            Study Resources
          </h2>

          <p>
            Access useful notes and study materials
            for your academics.
          </p>

          <span>
            View Resources →
          </span>
        </div>

        {/* APPLICATIONS */}

        <div
          className="dashboard-card"
          onClick={() =>
            document
              .getElementById(
                "applications-section"
              )
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          <div className="dashboard-icon">
            📝
          </div>

          <h2>
            My Applications
          </h2>

          <p>
            Track the opportunities you have
            applied for.
          </p>

          <span>
            {applications.length} Application
            {applications.length !== 1
              ? "s"
              : ""}{" "}
            →
          </span>
        </div>

      </div>

      {/* ================= APPLICATIONS ================= */}

      <section
        id="applications-section"
        className="applications-section"
      >

        <div className="applications-heading">
          <div>
            <p className="section-label">
              APPLICATION TRACKER
            </p>

            <h2>
              My Applications 📝
            </h2>
          </div>

          <button
            onClick={() =>
              navigate("/opportunities")
            }
          >
            Find Opportunities →
          </button>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="application-empty">
            <p>
              Loading applications... ⏳
            </p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="application-empty">
            <p className="application-error">
              {error}
            </p>
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          applications.length === 0 && (
            <div className="application-empty">

              <div className="empty-icon">
                📭
              </div>

              <h3>
                No Applications Yet
              </h3>

              <p>
                You haven't applied for any
                opportunities yet.
              </p>

              <button
                onClick={() =>
                  navigate("/opportunities")
                }
              >
                Explore Opportunities 🚀
              </button>

            </div>
          )}

        {/* APPLICATION LIST */}

        {!loading &&
          !error &&
          applications.length > 0 && (
            <div className="applications-list">

              {applications.map(
                (application) => (
                  <div
                    className="application-card"
                    key={application._id}
                  >

                    <div className="application-main">

                      <span className="opportunity-type">
                        {application.opportunity
                          ?.type || "Opportunity"}
                      </span>

                      <h3>
                        {application.opportunity
                          ?.title ||
                          "Opportunity"}
                      </h3>

                      <p>
                        🏢{" "}
                        {application.opportunity
                          ?.company ||
                          "Company not available"}
                      </p>

                      <p>
                        📍{" "}
                        {application.opportunity
                          ?.location ||
                          "Location not available"}
                      </p>

                    </div>

                    <div className="application-meta">

                      <span
                        className={`application-status ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>

                      <p>
                        Applied:{" "}
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </section>

    </div>
  );
}

export default Dashboard;