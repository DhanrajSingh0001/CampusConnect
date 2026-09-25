import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Application() {
  const location = useLocation();
  const navigate = useNavigate();

  const opportunity = location.state?.opportunity;

  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");

  const [coverLetter, setCoverLetter] = useState("");

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= NO OPPORTUNITY =================

  if (!opportunity) {
    return (
      <div className="resource-details">
        <div className="resource-details-card">
          <h1>Opportunity Not Found ❌</h1>

          <p>
            Please select an opportunity before applying.
          </p>

          <button
            onClick={() => navigate("/opportunities")}
          >
            ← Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  // ================= SELECT RESUME =================

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    setError("");
    setMessage("");

    if (!file) {
      setResume(null);
      setResumeUrl("");
      return;
    }

    // PDF check
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setResume(null);
      setResumeUrl("");
      e.target.value = "";
      return;
    }

    // 5 MB check
    if (file.size > 5 * 1024 * 1024) {
      setError("Resume size must be less than 5 MB.");
      setResume(null);
      setResumeUrl("");
      e.target.value = "";
      return;
    }

    setResume(file);
    setResumeUrl("");
  };

  // ================= UPLOAD RESUME =================

  const uploadResume = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      navigate("/login");
      return false;
    }

    if (!resume) {
      setError("Please select your resume PDF.");
      return false;
    }

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("resume", resume);

      const response = await fetch(
        "http://localhost:5000/api/upload/resume",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Resume upload failed."
        );

        return false;
      }

      setResumeUrl(data.resumeUrl);

      // Do NOT set message here.
      // Success message is shown using resumeUrl.

      return true;
    } catch (error) {
      console.error(error);

      setError(
        "Resume upload failed. Backend server check karo."
      );

      return false;
    } finally {
      setUploading(false);
    }
  };

  // ================= SUBMIT APPLICATION =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    if (!resumeUrl) {
      setError(
        "Please upload your resume before submitting."
      );

      return;
    }

    if (!coverLetter.trim()) {
      setError("Please write a cover letter.");

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            opportunity: opportunity._id,
            resume: resumeUrl,
            coverLetter: coverLetter,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to submit application."
        );

        return;
      }

      setMessage(
        "Application submitted successfully! ✅"
      );

      setResume(null);
      setResumeUrl("");
      setCoverLetter("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);

      setError(
        "Backend server se connection nahi ho raha."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================

  return (
    <div className="resource-details">
      <div className="resource-details-card">

        {/* ================= OPPORTUNITY INFO ================= */}

        <span className="resource-category">
          {opportunity.type}
        </span>

        <h1>
          Apply for {opportunity.title} 🚀
        </h1>

        <h3>
          🏢 {opportunity.company}
        </h3>

        <p>
          📍 <strong>Location:</strong>{" "}
          {opportunity.location}
        </p>

        <hr />

        {/* ================= APPLICATION FORM ================= */}

        <form onSubmit={handleSubmit}>

          {/* ================= RESUME ================= */}

          <div className="input-group">

            <label>
              Resume PDF
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeChange}
            />

            {resume && (
              <p
                style={{
                  marginTop: "10px",
                  color: "#475569",
                }}
              >
                📄 {resume.name}
              </p>
            )}

          </div>

          {/* ================= UPLOAD BUTTON ================= */}

          {resume && !resumeUrl && (
            <button
              type="button"
              onClick={uploadResume}
              disabled={uploading}
            >
              {uploading
                ? "Uploading Resume... ⏳"
                : "Upload Resume ☁️"}
            </button>
          )}

          {/* ================= UPLOAD SUCCESS ================= */}

          {resumeUrl && (
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              ✅ Resume uploaded successfully
            </p>
          )}

          {/* ================= COVER LETTER ================= */}

          <div
            className="input-group"
            style={{
              marginTop: "20px",
            }}
          >

            <label>
              Cover Letter
            </label>

            <textarea
              placeholder="Write your cover letter..."
              value={coverLetter}
              onChange={(e) =>
                setCoverLetter(e.target.value)
              }
              rows="7"
              required
            />

          </div>

          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            disabled={loading || uploading}
          >
            {loading
              ? "Submitting..."
              : "Submit Application 🚀"}
          </button>

        </form>

        {/* ================= APPLICATION SUCCESS ================= */}

        {message && (
          <p
            style={{
              color: "green",
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        {/* ================= ERROR ================= */}

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}

        <br />

        {/* ================= BACK ================= */}

        <button
          type="button"
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

export default Application;