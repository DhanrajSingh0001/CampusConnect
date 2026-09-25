const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const Opportunity = require("../models/Opportunity");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ================= ADMIN CHECK =================

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access denied ❌",
    });
  }

  next();
};


// ================= DASHBOARD =================

router.get(
  "/dashboard",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const users = await User.countDocuments();
      const events = await Event.countDocuments();
      const opportunities = await Opportunity.countDocuments();

      res.status(200).json({
        users,
        events,
        opportunities,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to load dashboard",
      });
    }
  }
);


// ================= GET ALL USERS =================

router.get(
  "/users",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.status(200).json(users);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch users",
      });
    }
  }
);


// ================= DELETE USER =================

router.delete(
  "/users/:id",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Admin khud ko delete nahi kar sakta
      if (user._id.toString() === req.user.id) {
        return res.status(400).json({
          message: "You cannot delete yourself",
        });
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: "User deleted successfully ✅",
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to delete user",
      });
    }
  }
);


module.exports = router;