import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  // ================= FETCH DASHBOARD DATA =================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Access denied");
        }

        return response.json();
      })
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Admin access denied ❌");
      });
  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ================= ERROR =================

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-error-card">
          <div className="admin-error-icon">
            🔐
          </div>

          <h1>Admin Access Required</h1>

          <p>{error}</p>

          <button
            className="admin-primary-btn"
            onClick={() => navigate("/login")}
          >
            ← Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ================= LOADING =================

  if (!stats) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-loading-icon">
            🛡️
          </div>

          <h2>Loading Admin Dashboard...</h2>

          <p>Please wait a moment ⏳</p>
        </div>
      </div>
    );
  }

  // ================= DASHBOARD =================

  return (
    <div className="admin-page">

      {/* ================= HEADER ================= */}

      <div className="admin-header">

        <div>
          <span className="admin-label">
            ADMIN PANEL
          </span>

          <h1>
            Dashboard 🛡️
          </h1>

          <p>
            Manage CampusConnect and monitor your
            campus platform.
          </p>
        </div>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

      {/* ================= QUICK NAVIGATION ================= */}

      <div className="admin-navigation">

        <button
          className="admin-nav-active"
          onClick={() => navigate("/admin")}
        >
          📊 Dashboard
        </button>

        <button
          onClick={() => navigate("/admin/users")}
        >
          👥 Manage Users
        </button>

        <button
          onClick={() => navigate("/admin/events")}
        >
          📅 Manage Events
        </button>

        <button
          onClick={() =>
            navigate("/admin/opportunities")
          }
        >
          💼 Manage Opportunities
        </button>

        <button
          onClick={() =>
            navigate("/admin/applications")
          }
        >
          📝 Manage Applications
        </button>

        <button
          onClick={() =>
            navigate("/admin/resources")
          }
        >
          📚 Manage Resources
        </button>

      </div>

      {/* ================= STATISTICS ================= */}

      <div className="admin-stats">

        <div className="admin-stat-card">

          <div className="admin-stat-icon users-icon">
            👨‍🎓
          </div>

          <div>
            <span>
              Total Users
            </span>

            <h2>
              {stats.users}
            </h2>

            <p>
              Registered users
            </p>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon events-icon">
            📅
          </div>

          <div>
            <span>
              Total Events
            </span>

            <h2>
              {stats.events}
            </h2>

            <p>
              Campus events
            </p>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon opportunities-icon">
            💼
          </div>

          <div>
            <span>
              Opportunities
            </span>

            <h2>
              {stats.opportunities}
            </h2>

            <p>
              Career opportunities
            </p>
          </div>

        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="admin-section">

        <div className="admin-section-header">

          <div>
            <span className="admin-label">
              QUICK ACTIONS
            </span>

            <h2>
              Create New Content
            </h2>

            <p>
              Quickly add new content to
              CampusConnect.
            </p>
          </div>

        </div>

        <div className="admin-action-grid">

          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/create-event")
            }
          >
            <span>📅</span>

            <div>
              <strong>
                Create Event
              </strong>

              <small>
                Add a new campus event
              </small>
            </div>

            <b>→</b>
          </button>

          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/create-opportunity")
            }
          >
            <span>💼</span>

            <div>
              <strong>
                Create Opportunity
              </strong>

              <small>
                Add job or internship
              </small>
            </div>

            <b>→</b>
          </button>

          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/create-resource")
            }
          >
            <span>📚</span>

            <div>
              <strong>
                Create Resource
              </strong>

              <small>
                Add study material
              </small>
            </div>

            <b>→</b>
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;