import { useLocation, useNavigate } from "react-router-dom";

function ResourceDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const resource = location.state?.resource;

  if (!resource) {
    return (
      <div className="resource-details">
        <div className="resource-not-found">
          <div className="resource-not-found-icon">
            📚
          </div>

          <h1>Resource Not Found</h1>

          <p>
            The resource you are looking for could not
            be found or may no longer be available.
          </p>

          <button
            onClick={() => navigate("/resources")}
          >
            ← Back to Resources
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="resource-details">

      {/* Back Button */}

      <button
        className="resource-details-back"
        onClick={() => navigate("/resources")}
      >
        ← Back to Resources
      </button>

      {/* Main Card */}

      <div className="resource-details-card">

        {/* Header */}

        <div className="resource-details-header">

          <div className="resource-details-icon">
            📚
          </div>

          <div className="resource-details-title">

            <span className="resource-details-category">
              {resource.category}
            </span>

            <h1>{resource.title}</h1>

            <p>
              Learn, practice and improve your skills
              with this study resource.
            </p>

          </div>

        </div>

        {/* Resource Information */}

        <div className="resource-details-info">

          <div className="resource-detail-item">

            <div className="resource-detail-icon">
              📂
            </div>

            <div>
              <span>Category</span>

              <strong>
                {resource.category}
              </strong>
            </div>

          </div>

          <div className="resource-detail-item">

            <div className="resource-detail-icon">
              ⭐
            </div>

            <div>
              <span>Difficulty Level</span>

              <strong>
                {resource.level}
              </strong>
            </div>

          </div>

        </div>

        {/* Description */}

        <div className="resource-description-section">

          <h2>
            About This Resource
          </h2>

          <p>
            {resource.description}
          </p>

        </div>

        {/* Action */}

        <div className="resource-details-actions">

          <button
            className="resource-back-btn"
            onClick={() => navigate("/resources")}
          >
            ← Explore More Resources
          </button>

        </div>

      </div>

    </div>
  );
}

export default ResourceDetails;
