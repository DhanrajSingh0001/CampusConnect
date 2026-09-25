import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// ================= PUBLIC PAGES =================

import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManageResources from "./pages/ManageResources";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

import Opportunities from "./pages/Opportunities";
import OpportunityDetails from "./pages/OpportunityDetails";

import Resources from "./pages/Resources";
import ResourceDetails from "./pages/ResourceDetails";

import Application from "./pages/Application";

// ================= PROTECTED PAGES =================

import Dashboard from "./pages/Dashboard";

// ================= ADMIN CREATE PAGES =================

import CreateEvent from "./pages/CreateEvent";
import CreateOpportunity from "./pages/CreateOpportunity";
import CreateResource from "./pages/CreateResource";

// ================= ADMIN PAGES =================

import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageEvents from "./pages/ManageEvents";
import AdminOpportunities from "./pages/AdminOpportunities";
import AdminApplications from "./pages/AdminApplications";

// ================= ROUTE PROTECTION =================

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/event-details"
          element={<EventDetails />}
        />

        <Route
          path="/opportunities"
          element={<Opportunities />}
        />

        <Route
          path="/opportunity-details"
          element={<OpportunityDetails />}
        />

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/resource-details"
          element={<ResourceDetails />}
        />

        <Route
          path="/application"
          element={<Application />}
        />

        {/* ================= STUDENT PROTECTED ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN CREATE ================= */}

        <Route
          path="/create-event"
          element={
            <AdminRoute>
              <CreateEvent />
            </AdminRoute>
          }
        />

        <Route
          path="/create-opportunity"
          element={
            <AdminRoute>
              <CreateOpportunity />
            </AdminRoute>
          }
        />

        <Route
          path="/create-resource"
          element={
            <AdminRoute>
              <CreateResource />
            </AdminRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <ManageEvents />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/opportunities"
          element={
            <AdminRoute>
              <AdminOpportunities />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <AdminApplications />
            </AdminRoute>
          }
        />
        <Route
  path="/admin/resources"
  element={
    <AdminRoute>
      <ManageResources />
    </AdminRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;