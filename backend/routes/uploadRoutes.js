const express = require("express");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= UPLOAD RESUME =================

router.post(
  "/resume",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      // Check file
      if (!req.file) {
        return res.status(400).json({
          message: "Please select a PDF resume.",
        });
      }

      // Upload buffer directly to Cloudinary
      const uploadResult = await new Promise(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "campusconnect/resumes",
                resource_type: "raw",
                public_id: `${Date.now()}-${req.file.originalname.replace(
                  /\.pdf$/i,
                  ""
                )}`,
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );

          stream.end(req.file.buffer);
        }
      );

      console.log(
        "Resume uploaded successfully:",
        uploadResult.secure_url
      );

      res.status(200).json({
        message: "Resume uploaded successfully ✅",
        resumeUrl: uploadResult.secure_url,
      });
    } catch (error) {
      console.error(
        "Cloudinary Upload Error:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Failed to upload resume.",
      });
    }
  }
);

module.exports = router;