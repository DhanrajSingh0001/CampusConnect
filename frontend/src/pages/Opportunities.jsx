import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Opportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/opportunities"
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Failed to load opportunities."
          );
          return;
        }

        setOpportunities(data);
      } catch (error) {
        console.error(error);

        setError(
          "Backend server se connection nahi ho raha."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this opportunity?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/opportunities/${id}`,
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
            "Failed to delete opportunity."
        );
        return;
      }

      setOpportunities((previous) =>
        previous.filter(
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
        "Backend server se connection nahi ho raha."
      );
    }
  };

  const locations = [
    ...new Set(
      opportunities.map(
        (opportunity) =>
          opportunity.location
      )
    ),
  ];

  const filteredOpportunities =
    opportunities.filter((opportunity) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        opportunity.title
          ?.toLowerCase()
          .includes(searchText) ||
        opportunity.company
          ?.toLowerCase()
          .includes(searchText);

      const matchesType =
        typeFilter === "All" ||
        opportunity.type === typeFilter;

      const matchesLocation =
        locationFilter === "All" ||
        opportunity.location ===
          locationFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation
      );
    });

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setLocationFilter("All");
  };

  const getTypeClass = (type) => {
    if (type === "Internship") {
      return "type-internship";
    }

    if (type === "Job") {
      return "type-job";
    }

    if (type === "Scholarship") {
      return "type-scholarship";
    }

    return "type-default";
  };

  return (
    <div className="opportunities-page">

      {/* ================= HEADER ================= */}

      <div className="opportunities-header">

        <div>
          <span className="section-label">
            CAREER & GROWTH
          </span>

          <h1>
            Opportunities 💼
          </h1>

          <p>
            Discover internships, jobs and
            scholarships that can help you
            build your career.
          </p>
        </div>

        {user?.role === "admin" && (
          <button
            className="create-opportunity-btn"
            onClick={() =>
              navigate("/create-opportunity")
            }
          >
            + Create Opportunity
          </button>
        )}

      </div>

      {/* ================= FILTERS ================= */}

      <div className="opportunity-filters">

        <input
          type="text"
          placeholder="🔎 Search by title or company..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
        >
          <option value="All">
            All Types
          </option>

          <option value="Internship">
            Internship
          </option>

          <option value="Job">
            Job
          </option>

          <option value="Scholarship">
            Scholarship
          </option>
        </select>

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

        {(search ||
          typeFilter !== "All" ||
          locationFilter !== "All") && (
          <button
            className="clear-opportunity-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}

      </div>

      {/* ================= RESULT COUNT ================= */}

      {!loading && !error && (
        <div className="opportunity-result-count">
          Showing{" "}
          <strong>
            {filteredOpportunities.length}
          </strong>{" "}
          of{" "}
          <strong>
            {opportunities.length}
          </strong>{" "}
          opportunities
        </div>
      )}

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="opportunity-message">
          <div>⏳</div>

          <h3>
            Loading Opportunities...
          </h3>

          <p>
            Please wait while we fetch the
            latest opportunities.
          </p>
        </div>
      )}

      {/* ================= ERROR ================= */}

      {!loading && error && (
        <div className="opportunity-message">

          <div>❌</div>

          <h3>
            Something went wrong
          </h3>

          <p>{error}</p>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>

        </div>
      )}

      {/* ================= EMPTY ================= */}

      {!loading &&
        !error &&
        filteredOpportunities.length === 0 && (
          <div className="opportunity-message">

            <div>📭</div>

            <h3>
              No Opportunities Found
            </h3>

            <p>
              Try changing your search or
              filters.
            </p>

            {(search ||
              typeFilter !== "All" ||
              locationFilter !== "All") && (
              <button
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}

          </div>
        )}

      {/* ================= CARDS ================= */}

      {!loading &&
        !error &&
        filteredOpportunities.length > 0 && (
          <div className="opportunities-container">

            {filteredOpportunities.map(
              (opportunity) => (
                <div
                  className="opportunity-card"
                  key={opportunity._id}
                >

                  {/* CARD HEADER */}

                  <div className="opportunity-card-top">

                    <div className="opportunity-icon">
                      💼
                    </div>

                    <span
                      className={`opportunity-type-badge ${getTypeClass(
                        opportunity.type
                      )}`}
                    >
                      {opportunity.type}
                    </span>

                  </div>

                  {/* TITLE */}

                  <h2>
                    {opportunity.title}
                  </h2>

                  <h3>
                    🏢 {opportunity.company}
                  </h3>

                  {/* INFO */}

                  <div className="opportunity-info">

                    <span>
                      📍 {opportunity.location}
                    </span>

                    <span>
                      🗓️{" "}
                      {new Date(
                        opportunity.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="opportunity-description">
                    {opportunity.description}
                  </p>

                  {/* ACTIONS */}

                  <div className="opportunity-actions">

                    <button
                      className="view-opportunity-btn"
                      onClick={() =>
                        navigate(
                          "/opportunity-details",
                          {
                            state: {
                              opportunity:
                                opportunity,
                            },
                          }
                        )
                      }
                    >
                      View Details →
                    </button>

                    {user?.role === "admin" && (
                      <button
                        className="delete-opportunity-btn"
                        onClick={() =>
                          handleDelete(
                            opportunity._id
                          )
                        }
                      >
                        🗑️
                      </button>
                    )}

                  </div>

                </div>
              )
            )}

          </div>
        )}

    </div>
  );
}

export default Opportunities;