import { useLocation, useNavigate } from "react-router-dom";

function OpportunityDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const opportunity = location.state?.opportunity;

  if (!opportunity) {
    return (
      <div className="opportunity-details">
        <div className="opportunity-not-found">
          <div className="opportunity-not-found-icon">
            💼
          </div>

          <h1>Opportunity Not Found</h1>

          <p>
            The opportunity you are looking for could
            not be found or may no longer be available.
          </p>

          <button
            onClick={() =>
              navigate("/opportunities")
            }
          >
            ← Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  const getTypeClass = () => {
    if (opportunity.type === "Internship") {
      return "opportunity-detail-internship";
    }

    if (opportunity.type === "Job") {
      return "opportunity-detail-job";
    }

    if (opportunity.type === "Scholarship") {
      return "opportunity-detail-scholarship";
    }

    return "opportunity-detail-default";
  };

  return (
    <div className="opportunity-details">

      {/* Back Button */}

      <button
        className="opportunity-details-back"
        onClick={() =>
          navigate("/opportunities")
        }
      >
        ← Back to Opportunities
      </button>

      {/* Main Card */}

      <div className="opportunity-details-card">

        {/* Header */}

        <div className="opportunity-details-header">

          <div className="opportunity-details-icon">
            💼
          </div>

          <div className="opportunity-details-title">

            <span
              className={`opportunity-detail-type ${getTypeClass()}`}
            >
              {opportunity.type}
            </span>

            <h1>{opportunity.title}</h1>

            <p className="opportunity-company">
              🏢 {opportunity.company}
            </p>

          </div>

        </div>

        {/* Information */}

        <div className="opportunity-details-info">

          <div className="opportunity-detail-item">

            <div className="opportunity-detail-item-icon">
              💼
            </div>

            <div>
              <span>Opportunity Type</span>

              <strong>
                {opportunity.type}
              </strong>
            </div>

          </div>

          <div className="opportunity-detail-item">

            <div className="opportunity-detail-item-icon">
              📍
            </div>

            <div>
              <span>Location</span>

              <strong>
                {opportunity.location}
              </strong>
            </div>

          </div>

          <div className="opportunity-detail-item">

            <div className="opportunity-detail-item-icon">
              🏢
            </div>

            <div>
              <span>Company</span>

              <strong>
                {opportunity.company}
              </strong>
            </div>

          </div>

        </div>

        {/* Description */}

        <div className="opportunity-description-section">

          <h2>
            About This Opportunity
          </h2>

          <p>
            {opportunity.description}
          </p>

        </div>

        {/* Actions */}

        <div className="opportunity-details-actions">

          <button
            className="opportunity-apply-btn"
            onClick={() =>
              navigate("/application", {
                state: { opportunity },
              })
            }
          >
            Apply Now 🚀
          </button>

          <button
            className="opportunity-back-btn"
            onClick={() =>
              navigate("/opportunities")
            }
          >
            ← Back to Opportunities
          </button>

        </div>

      </div>

    </div>
  );
}

export default OpportunityDetails;