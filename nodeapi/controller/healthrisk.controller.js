const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "healthrisk_image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).single("hr_img");

// Get all Health Risks
function getAll(req, res) {
  db.query(
    `SELECT hrid, hrname, hr_img, hr_info FROM health_risk WHERE isActive=1`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    }
  );
}

// Get Health Risk by ID
function getHRById(req, res) {
  const { hrid } = req.params;
  db.query(
    `SELECT hrid, hrname, hr_img, hr_info FROM health_risk WHERE hrid=? AND isActive=1`,
    [hrid],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Record not found" });
      return res.status(200).json(result[0]);
    }
  );
}

// Insert new Health Risk
function insertHRI(req, res) {
  upload(req, res, function (err) {
    if (err) return res.status(500).json(err);

    const { hrname, hr_info } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const filename = req.file.filename;

    db.query(
      `INSERT INTO health_risk (hrname, hr_img, hr_info) VALUES (?, ?, ?)`,
      [hrname, filename, hr_info],
      (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Health Risk added successfully" });
      }
    );
  });
}

// Update Health Risk
function updateHR(req, res) {
  upload(req, res, function (err) {
    if (err) return res.status(500).json(err);

    const { hrid } = req.params;
    const { hrname, hr_info } = req.body;
    const filename = req.file ? req.file.filename : null; // ✅ safe check

    db.query(
      `SELECT hr_img FROM health_risk WHERE hrid=?`,
      [hrid],
      (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0)
          return res.status(404).json({ message: "Record not found" });

        const oldImg = result[0].hr_img;

        // ✅ Delete old image only if new one uploaded
        if (filename && oldImg) {
          const filepath = path.join(__dirname, "../healthrisk_image", oldImg);
          if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        }

        const query = filename
          ? `UPDATE health_risk SET hrname=?, hr_info=?, hr_img=? WHERE hrid=?`
          : `UPDATE health_risk SET hrname=?, hr_info=? WHERE hrid=?`;

        const params = filename
          ? [hrname, hr_info, filename, hrid]
          : [hrname, hr_info, hrid];

        db.query(query, params, (err) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({ message: "Health Risk updated successfully" });
        });
      }
    );
  });
}

// Soft Delete Health Risk
function removeHR(req, res) {
  const { hrid } = req.params;
  db.query(
    `UPDATE health_risk SET isActive=0 WHERE hrid=?`,
    [hrid],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Health Risk deleted successfully" });
    }
  );
}

module.exports = {
  getAll,
  getHRById,
  insertHRI,
  updateHR,
  removeHR,
};