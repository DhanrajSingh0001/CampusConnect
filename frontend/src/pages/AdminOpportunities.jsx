import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminOpportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOpportunities = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/opportunities`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch opportunities"
        );
      }

      const data = await response.json();

      setOpportunities(data);
      setLoading(false);
    } catch (error) {
      console.error(error);

      setError(
        "Opportunities load nahi ho pa rahi hain ❌"
      );

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const deleteOpportunity = async (id) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this opportunity?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/opportunities/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setOpportunities((previousOpportunities) =>
        previousOpportunities.filter(
          (opportunity) =>
            opportunity._id !== id
        )
      );

      alert(
        "Opportunity deleted successfully ✅"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete opportunity ❌"
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="admin-page">

        <div className="admin-loading">

          <div className="admin-loading-icon">
            💼
          </div>

          <h2>
            Loading Opportunities...
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
            Unable to Load Opportunities
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
            OPPORTUNITY MANAGEMENT
          </span>

          <h1>
            Manage Opportunities 💼
          </h1>

          <p>
            View, create and manage jobs,
            internships and scholarships.
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
              navigate("/create-opportunity")
            }
          >
            + Create Opportunity
          </button>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="opportunities-summary">

        <div className="opportunities-summary-icon">
          💼
        </div>

        <div>
          <span>
            Total Opportunities
          </span>

          <h2>
            {opportunities.length}
          </h2>
        </div>

      </div>

      {/* ================= EMPTY ================= */}

      {opportunities.length === 0 ? (

        <div className="admin-empty-card">

          <div>
            💼
          </div>

          <h2>
            No Opportunities Found
          </h2>

          <p>
            Create your first job, internship
            or scholarship opportunity.
          </p>

          <button
            className="admin-primary-btn"
            onClick={() =>
              navigate("/create-opportunity")
            }
          >
            + Create Opportunity
          </button>

        </div>

      ) : (

        /* ================= LIST ================= */

        <div className="manage-opportunities-grid">

          {opportunities.map((opportunity) => {

            let typeClass =
              "manage-opportunity-default";

            if (
              opportunity.type === "Internship"
            ) {
              typeClass =
                "manage-opportunity-internship";
            }

            if (
              opportunity.type === "Job"
            ) {
              typeClass =
                "manage-opportunity-job";
            }

            if (
              opportunity.type === "Scholarship"
            ) {
              typeClass =
                "manage-opportunity-scholarship";
            }

            return (
              <div
                className="manage-opportunity-card"
                key={opportunity._id}
              >

                {/* Header */}

                <div className="manage-opportunity-header">

                  <div className="manage-opportunity-icon">
                    💼
                  </div>

                  <span
                    className={`manage-opportunity-badge ${typeClass}`}
                  >
                    {opportunity.type}
                  </span>

                </div>

                {/* Content */}

                <h2>
                  {opportunity.title}
                </h2>

                <p className="manage-opportunity-company">
                  🏢 {opportunity.company}
                </p>

                <div className="manage-opportunity-info">

                  <div>
                    <span>
                      📍 Location
                    </span>

                    <strong>
                      {opportunity.location}
                    </strong>
                  </div>

                  <div>
                    <span>
                      💼 Type
                    </span>

                    <strong>
                      {opportunity.type}
                    </strong>
                  </div>

                </div>

                <p className="manage-opportunity-description">
                  {opportunity.description}
                </p>

                {/* Actions */}

                <div className="manage-opportunity-actions">

                  <button
                    className="manage-opportunity-view-btn"
                    onClick={() =>
                      navigate(
                        "/opportunity-details",
                        {
                          state: {
                            opportunity,
                          },
                        }
                      )
                    }
                  >
                    View Details →
                  </button>

                  <button
                    className="manage-opportunity-delete-btn"
                    onClick={() =>
                      deleteOpportunity(
                        opportunity._id
                      )
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}

export default AdminOpportunities;