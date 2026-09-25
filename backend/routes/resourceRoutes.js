const express = require("express");

const Resource = require("../models/Resource");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ==================================================
// GET ALL RESOURCES
// ==================================================

router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find().sort({
      createdAt: -1,
    });

    res.status(200).json(resources);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch resources",
    });
  }
});

// ==================================================
// CREATE RESOURCE - ADMIN ONLY
// ==================================================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const {
        title,
        category,
        level,
        description,
      } = req.body;

      if (
        !title ||
        !category ||
        !level ||
        !description
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const resource = new Resource({
        title,
        category,
        level,
        description,
        createdBy: req.user.id,
      });

      const savedResource =
        await resource.save();

      res.status(201).json({
        message:
          "Resource created successfully ✅",
        resource: savedResource,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to create resource",
      });
    }
  }
);

// ==================================================
// DELETE RESOURCE - ADMIN ONLY
// ==================================================

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {
        return res.status(404).json({
          message: "Resource not found",
        });
      }

      await Resource.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Resource deleted successfully ✅",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to delete resource",
      });
    }
  }
);

module.exports = router;