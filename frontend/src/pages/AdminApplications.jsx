import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH APPLICATIONS =================

  const fetchApplications = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/applications`,
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
            "Failed to fetch applications."
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

  useEffect(() => {
    fetchApplications();
  }, []);

  // ================= UPDATE STATUS =================

  const updateStatus = async (
    applicationId,
    status
  ) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/applications/${applicationId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update status."
        );
        return;
      }

      setApplications(
        (previousApplications) =>
          previousApplications.map(
            (application) =>
              application._id === applicationId
                ? {
                    ...application,
                    status,
                  }
                : application
          )
      );

      alert(
        "Application status updated successfully ✅"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Backend server se connection nahi ho raha."
      );
    }
  };

  // ================= STATUS CLASS =================

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "application-status-applied";

      case "Under Review":
        return "application-status-review";

      case "Shortlisted":
        return "application-status-shortlisted";

      case "Accepted":
        return "application-status-accepted";

      case "Rejected":
        return "application-status-rejected";

      default:
        return "application-status-default";
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="admin-page">

        <div className="admin-loading">

          <div className="admin-loading-icon">
            📝
          </div>

          <h2>
            Loading Applications...
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
            Unable to Load Applications
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
            APPLICATION MANAGEMENT
          </span>

          <h1>
            Manage Applications 📝
          </h1>

          <p>
            Review student applications and
            update their application status.
          </p>

        </div>

        <button
          className="admin-secondary-btn"
          onClick={() =>
            navigate("/admin")
          }
        >
          ← Dashboard
        </button>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="applications-summary">

        <div className="applications-summary-icon">
          📝
        </div>

        <div>

          <span>
            Total Applications
          </span>

          <h2>
            {applications.length}
          </h2>

        </div>

      </div>

      {/* ================= EMPTY ================= */}

      {applications.length === 0 ? (

        <div className="admin-empty-card">

          <div>
            📭
          </div>

          <h2>
            No Applications Yet
          </h2>

          <p>
            Students have not submitted any
            applications yet.
          </p>

        </div>

      ) : (

        /* ================= APPLICATION GRID ================= */

        <div className="manage-applications-grid">

          {applications.map(
            (application) => {

              const student =
                application.student;

              const opportunity =
                application.opportunity;

              return (
                <div
                  className="manage-application-card"
                  key={application._id}
                >

                  {/* ================= CARD HEADER ================= */}

                  <div className="manage-application-header">

                    <div className="application-student-avatar">
                      {student?.name
                        ?.charAt(0)
                        .toUpperCase() || "S"}
                    </div>

                    <div className="application-student-info">

                      <h2>
                        {student?.name ||
                          "Unknown Student"}
                      </h2>

                      <span>
                        🎓 Student Application
                      </span>

                    </div>

                  </div>

                  {/* ================= OPPORTUNITY ================= */}

                  <div className="application-opportunity">

                    <span>
                      APPLIED FOR
                    </span>

                    <h3>
                      {opportunity?.title ||
                        "Opportunity"}
                    </h3>

                    <p>
                      🏢{" "}
                      {opportunity?.company ||
                        "Company not available"}
                    </p>

                  </div>

                  {/* ================= DETAILS ================= */}

                  <div className="application-details-grid">

                    <div>

                      <span>
                        📧 Email
                      </span>

                      <strong>
                        {student?.email ||
                          "N/A"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        📍 Location
                      </span>

                      <strong>
                        {opportunity?.location ||
                          "N/A"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        📅 Applied
                      </span>

                      <strong>
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </strong>

                    </div>

                  </div>

                  {/* ================= STATUS ================= */}

                  <div className="application-status-section">

                    <div>

                      <span>
                        CURRENT STATUS
                      </span>

                      <strong
                        className={`admin-application-status ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </strong>

                    </div>

                    <select
                      value={application.status}
                      onChange={(e) =>
                        updateStatus(
                          application._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Applied">
                        Applied
                      </option>

                      <option value="Under Review">
                        Under Review
                      </option>

                      <option value="Shortlisted">
                        Shortlisted
                      </option>

                      <option value="Accepted">
                        Accepted
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                    </select>

                  </div>

                  {/* ================= RESUME ================= */}

                  <div className="application-resume">

                    <span>
                      📄 Resume
                    </span>

                    {application.resume ? (
                      <a
                        href={
                          application.resume
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume ↗
                      </a>
                    ) : (
                      <strong>
                        Resume not available
                      </strong>
                    )}

                  </div>

                  {/* ================= COVER LETTER ================= */}

                  <div className="application-cover-letter">

                    <span>
                      📝 Cover Letter
                    </span>

                    <p>
                      {application.coverLetter ||
                        "No cover letter provided."}
                    </p>

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}

    </div>
  );
}

export default AdminApplications;