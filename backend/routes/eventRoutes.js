const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= GET ALL EVENTS =================

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
});

// ================= CREATE EVENT =================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, date, location, description } = req.body;

    if (!title || !date || !location || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const event = new Event({
      title,
      date,
      location,
      description,
      createdBy: req.user.id,
    });

    const savedEvent = await event.save();

    res.status(201).json({
      message: "Event created successfully ✅",
      event: savedEvent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create event",
    });
  }
});

// ================= DELETE EVENT =================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Event deleted successfully ✅",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete event",
    });
  }
});

module.exports = router;