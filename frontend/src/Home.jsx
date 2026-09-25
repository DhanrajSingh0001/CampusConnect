import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            🎓 Your Complete Campus Platform
          </span>

          <h1>
            Connect. Learn.
            <br />
            <span>Grow.</span>
          </h1>

          <p>
            CampusConnect helps students discover campus events,
            internships, jobs, scholarships and useful study resources
            — all in one place.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/opportunities")}
            >
              Explore Opportunities 🚀
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/events")}
            >
              Explore Events 📅
            </button>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-card main-hero-card">
            <div className="hero-card-icon">🎓</div>

            <h3>CampusConnect</h3>

            <p>
              Everything you need for your college journey.
            </p>

            <div className="hero-mini-stats">

              <div>
                <strong>📅</strong>
                <span>Events</span>
              </div>

              <div>
                <strong>💼</strong>
                <span>Jobs</span>
              </div>

              <div>
                <strong>📚</strong>
                <span>Resources</span>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="features-section">

        <div className="section-heading">

          <span className="section-label">
            WHAT WE OFFER
          </span>

          <h2>
            Everything Students Need
          </h2>

          <p>
            One platform to manage your campus life and career growth.
          </p>

        </div>

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              📅
            </div>

            <h3>Campus Events</h3>

            <p>
              Discover workshops, hackathons, seminars
              and exciting college events.
            </p>

            <button
              onClick={() => navigate("/events")}
            >
              Explore Events →
            </button>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              💼
            </div>

            <h3>Career Opportunities</h3>

            <p>
              Find internships, jobs and scholarships
              to build your career.
            </p>

            <button
              onClick={() => navigate("/opportunities")}
            >
              Find Opportunities →
            </button>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              📚
            </div>

            <h3>Study Resources</h3>

            <p>
              Access useful notes and learning materials
              for your academics.
            </p>

            <button
              onClick={() => navigate("/resources")}
            >
              View Resources →
            </button>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div>

          <span className="section-label">
            START YOUR JOURNEY
          </span>

          <h2>
            Ready to grow with CampusConnect?
          </h2>

          <p>
            Create your account and start exploring
            opportunities today.
          </p>

        </div>

        <button
          onClick={() => navigate("/signup")}
        >
          Create Account 🚀
        </button>

      </section>

    </div>
  );
}

export default Home;