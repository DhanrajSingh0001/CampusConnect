const express = require("express");
const Opportunity = require("../models/Opportunity");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= GET ALL OPPORTUNITIES =================

router.get("/", async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({
      createdAt: -1,
    });

    res.status(200).json(opportunities);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch opportunities",
    });
  }
});

// ================= CREATE OPPORTUNITY =================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      company,
      type,
      location,
      description,
    } = req.body;

    if (
      !title ||
      !company ||
      !type ||
      !location ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const opportunity = new Opportunity({
      title,
      company,
      type,
      location,
      description,
      createdBy: req.user.id,
    });

    const savedOpportunity = await opportunity.save();

    res.status(201).json({
      message: "Opportunity created successfully ✅",
      opportunity: savedOpportunity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create opportunity",
    });
  }
});

// ================= DELETE OPPORTUNITY =================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(
      req.params.id
    );

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found",
      });
    }

    await Opportunity.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Opportunity deleted successfully ✅",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete opportunity",
    });
  }
});

module.exports = router;