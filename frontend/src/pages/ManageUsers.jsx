import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/admin/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Users load nahi ho pa rahe hain ❌"
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
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
            "Failed to delete user"
        );
        return;
      }

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => user._id !== id
        )
      );

      alert(
        "User deleted successfully ✅"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong ❌"
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="admin-page">

        <div className="admin-loading">
          <div className="admin-loading-icon">
            👥
          </div>

          <h2>
            Loading Users...
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
            Unable to Load Users
          </h1>

          <p>
            {error}
          </p>

          <button
            className="admin-primary-btn"
            onClick={() => navigate("/admin")}
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
            USER MANAGEMENT
          </span>

          <h1>
            Manage Users 👥
          </h1>

          <p>
            View and manage CampusConnect
            registered users.
          </p>

        </div>

        <button
          className="admin-secondary-btn"
          onClick={() => navigate("/admin")}
        >
          ← Dashboard
        </button>

      </div>

      {/* ================= USER SUMMARY ================= */}

      <div className="users-summary">

        <div className="users-summary-icon">
          👥
        </div>

        <div>
          <span>
            Total Registered Users
          </span>

          <h2>
            {users.length}
          </h2>
        </div>

      </div>

      {/* ================= USERS ================= */}

      {users.length === 0 ? (

        <div className="admin-empty-card">

          <div>
            👥
          </div>

          <h2>
            No Users Found
          </h2>

          <p>
            There are currently no registered
            users in CampusConnect.
          </p>

        </div>

      ) : (

        <div className="users-container">

          {users.map((user) => (

            <div
              className="user-card"
              key={user._id}
            >

              {/* User Header */}

              <div className="user-card-header">

                <div className="user-avatar">
                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div className="user-name-section">

                  <h2>
                    {user.name}
                  </h2>

                  <span
                    className={`user-role ${
                      user.role === "admin"
                        ? "user-role-admin"
                        : "user-role-student"
                    }`}
                  >
                    {user.role === "admin"
                      ? "🛡️ Admin"
                      : "🎓 Student"}
                  </span>

                </div>

              </div>

              {/* User Details */}

              <div className="user-details">

                <div className="user-detail-row">

                  <span>
                    📧 Email
                  </span>

                  <strong>
                    {user.email}
                  </strong>

                </div>

                <div className="user-detail-row">

                  <span>
                    👤 Role
                  </span>

                  <strong>
                    {user.role}
                  </strong>

                </div>

                <div className="user-detail-row">

                  <span>
                    📅 Joined
                  </span>

                  <strong>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </strong>

                </div>

              </div>

              {/* Delete */}

              <button
                onClick={() =>
                  deleteUser(user._id)
                }
                className="delete-user-btn"
              >
                🗑️ Delete User
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ManageUsers;