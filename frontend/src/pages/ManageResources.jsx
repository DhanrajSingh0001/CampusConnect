import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageResources() {
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResources = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resources`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to fetch resources."
        );
        return;
      }

      setResources(data);
    } catch (error) {
      console.error(error);

      setError(
        "Backend server se connection nahi ho raha."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (resourceId) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resources/${resourceId}`,
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
            "Failed to delete resource."
        );
        return;
      }

      setResources((previousResources) =>
        previousResources.filter(
          (resource) =>
            resource._id !== resourceId
        )
      );

      alert(
        "Resource deleted successfully ✅"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Backend server se connection nahi ho raha."
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="admin-page">

        <div className="admin-loading">

          <div className="admin-loading-icon">
            📚
          </div>

          <h2>
            Loading Resources...
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
            Unable to Load Resources
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
            RESOURCE MANAGEMENT
          </span>

          <h1>
            Manage Resources 📚
          </h1>

          <p>
            Create, view and manage study resources
            for students.
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
              navigate("/create-resource")
            }
          >
            + Create Resource
          </button>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="resources-summary">

        <div className="resources-summary-icon">
          📚
        </div>

        <div>

          <span>
            Total Study Resources
          </span>

          <h2>
            {resources.length}
          </h2>

        </div>

      </div>

      {/* ================= EMPTY ================= */}

      {resources.length === 0 ? (

        <div className="admin-empty-card">

          <div>
            📚
          </div>

          <h2>
            No Resources Found
          </h2>

          <p>
            Create your first study resource
            for students.
          </p>

          <button
            className="admin-primary-btn"
            onClick={() =>
              navigate("/create-resource")
            }
          >
            + Create Resource
          </button>

        </div>

      ) : (

        /* ================= RESOURCE GRID ================= */

        <div className="manage-resources-grid">

          {resources.map((resource) => (

            <div
              className="manage-resource-card"
              key={resource._id}
            >

              {/* Header */}

              <div className="manage-resource-header">

                <div className="manage-resource-icon">
                  📚
                </div>

                <span className="manage-resource-category">
                  {resource.category}
                </span>

              </div>

              {/* Content */}

              <h2>
                {resource.title}
              </h2>

              <div className="manage-resource-level">

                <span>
                  DIFFICULTY LEVEL
                </span>

                <strong>
                  ⭐ {resource.level}
                </strong>

              </div>

              <p className="manage-resource-description">
                {resource.description}
              </p>

              {/* Actions */}

              <div className="manage-resource-actions">

                <button
                  className="manage-resource-view-btn"
                  onClick={() =>
                    navigate(
                      "/resource-details",
                      {
                        state: { resource },
                      }
                    )
                  }
                >
                  View Details →
                </button>

                <button
                  className="manage-resource-delete-btn"
                  onClick={() =>
                    handleDelete(
                      resource._id
                    )
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

export default ManageResources;