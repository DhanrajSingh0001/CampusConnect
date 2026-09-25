// ================= LOAD ENV FIRST =================

require("dotenv").config();


// ================= IMPORTS =================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

// ================= APP =================

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());


// ================= ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/opportunities", opportunityRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/resources", resourceRoutes);
// ================= PROTECTED ROUTE =================

app.get(
  "/api/protected",
  authMiddleware,
  (req, res) => {
    res.json({
      message:
        "Protected route accessed successfully 🔐",
      user: req.user,
    });
  }
);


// ================= HOME ROUTE =================

app.get("/", (req, res) => {
  res.send(
    "CampusConnect Backend is Running 🚀"
  );
});


// ================= MONGODB =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected Successfully ✅"
    );

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} 🚀`
      );
    });

  })
  .catch((error) => {

    console.error(
      "MongoDB Connection Failed ❌"
    );

    console.error(error.message);

  });