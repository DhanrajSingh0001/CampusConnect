import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Resources() {
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH RESOURCES
  // --------------------------------------------------

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/resources`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Failed to load resources."
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

    fetchResources();
  }, []);

  // --------------------------------------------------
  // CATEGORIES
  // --------------------------------------------------

  const categories = [
    ...new Set(
      resources
        .map((resource) => resource.category)
        .filter(Boolean)
    ),
  ];

  // --------------------------------------------------
  // FILTER
  // --------------------------------------------------

  const filteredResources = resources.filter(
    (resource) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        resource.title
          ?.toLowerCase()
          .includes(searchText) ||
        resource.description
          ?.toLowerCase()
          .includes(searchText) ||
        resource.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        categoryFilter === "All" ||
        resource.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  // --------------------------------------------------
  // CLEAR FILTERS
  // --------------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
  };

  // --------------------------------------------------
  // CATEGORY ICON
  // --------------------------------------------------

  const getCategoryIcon = (category) => {
    const value = category?.toLowerCase();

    if (value?.includes("program")) {
      return "💻";
    }

    if (value?.includes("database")) {
      return "🗄️";
    }

    if (value?.includes("web")) {
      return "🌐";
    }

    if (value?.includes("data")) {
      return "📊";
    }

    if (value?.includes("network")) {
      return "🌐";
    }

    if (value?.includes("exam")) {
      return "📝";
    }

    if (value?.includes("dsa")) {
      return "🧠";
    }

    return "📚";
  };

  return (
    <div className="resources-page">

      {/* ================= HEADER ================= */}

      <div className="resources-header">

        <div>
          <span className="section-label">
            LEARN & GROW
          </span>

          <h1>
            Study Resources 📚
          </h1>

          <p>
            Explore useful notes, learning materials
            and resources to improve your academic
            knowledge.
          </p>
        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="resource-filters">

        <input
          type="text"
          placeholder="🔎 Search resources..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {(search ||
          categoryFilter !== "All") && (
          <button
            className="clear-resource-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}

      </div>

      {/* ================= RESULT COUNT ================= */}

      {!loading && !error && (
        <div className="resource-result-count">
          Showing{" "}
          <strong>
            {filteredResources.length}
          </strong>{" "}
          of{" "}
          <strong>{resources.length}</strong>{" "}
          resources
        </div>
      )}

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="resource-message">

          <div className="resource-message-icon">
            ⏳
          </div>

          <h3>
            Loading Resources...
          </h3>

          <p>
            Please wait while we fetch the
            latest study resources.
          </p>

        </div>
      )}

      {/* ================= ERROR ================= */}

      {!loading && error && (
        <div className="resource-message">

          <div className="resource-message-icon">
            ❌
          </div>

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
        filteredResources.length === 0 && (
          <div className="resource-message">

            <div className="resource-message-icon">
              📭
            </div>

            <h3>
              No Resources Found
            </h3>

            <p>
              Try changing your search or category
              filter.
            </p>

            {(search ||
              categoryFilter !== "All") && (
              <button
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}

          </div>
        )}

      {/* ================= RESOURCE GRID ================= */}

      {!loading &&
        !error &&
        filteredResources.length > 0 && (
          <div className="resources-grid">

            {filteredResources.map(
              (resource) => (
                <div
                  className="resource-card"
                  key={resource._id}
                >

                  {/* CARD TOP */}

                  <div className="resource-card-top">

                    <div className="resource-icon">
                      {getCategoryIcon(
                        resource.category
                      )}
                    </div>

                    <span className="resource-category">
                      {resource.category ||
                        "Study Resource"}
                    </span>

                  </div>

                  {/* TITLE */}

                  <h2>
                    {resource.title}
                  </h2>

                  {/* DESCRIPTION */}

                  <p className="resource-description">
                    {resource.description ||
                      "Useful study material for students."}
                  </p>

                  {/* ACTION */}

                  <button
                    className="view-resource-btn"
                    onClick={() =>
                      navigate(
                        "/resource-details",
                        {
                          state: {
                            resource: resource,
                          },
                        }
                      )
                    }
                  >
                    View Resource →
                  </button>

                </div>
              )
            )}

          </div>
        )}

    </div>
  );
}

export default Resources;
