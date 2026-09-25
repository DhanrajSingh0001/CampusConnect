const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ================= APPLY FOR OPPORTUNITY =================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      opportunity,
      resume,
      coverLetter,
    } = req.body;

    if (!opportunity || !resume || !coverLetter) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if student already applied
    const existingApplication = await Application.findOne({
      student: req.user.id,
      opportunity: opportunity,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this opportunity",
      });
    }

    const application = new Application({
      student: req.user.id,
      opportunity,
      resume,
      coverLetter,
    });

    const savedApplication = await application.save();

    res.status(201).json({
      message: "Application submitted successfully ✅",
      application: savedApplication,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit application",
    });
  }
});


// ================= MY APPLICATIONS =================

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    })
      .populate("opportunity")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
});


// ================= ADMIN: GET ALL APPLICATIONS =================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const applications = await Application.find()
        .populate("student", "-password")
        .populate("opportunity")
        .sort({ createdAt: -1 });

      res.status(200).json(applications);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch applications",
      });
    }
  }
);


// ================= ADMIN: UPDATE APPLICATION STATUS =================

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Accepted",
        "Rejected",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid application status",
        });
      }

      const application = await Application.findById(
        req.params.id
      );

      if (!application) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      application.status = status;

      const updatedApplication = await application.save();

      res.status(200).json({
        message: "Application status updated successfully ✅",
        application: updatedApplication,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to update application status",
      });
    }
  }
);


// ================= DELETE APPLICATION =================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Student can delete only their own application
    if (
      application.student.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You can only delete your own application",
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Application deleted successfully ✅",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete application",
    });
  }
});


module.exports = router;