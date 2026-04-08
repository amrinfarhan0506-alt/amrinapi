const db = require("../config/db");

// Get all diseases with category
function getAll(req, res) {
  db.query(
    `SELECT d.did, d.dname, d.dis_intro, d.catid, c.catname
     FROM diseases AS d
     LEFT JOIN category AS c ON d.catid = c.catid
     WHERE d.isActive = 1`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json(result);
    }
  );
}

// Get disease by ID
function getDiseasesById(req, res) {
  const { id } = req.params;
  db.query(
    `SELECT d.did, d.dname, d.dis_intro, d.catid, c.catname
     FROM diseases AS d
     LEFT JOIN category AS c ON d.catid = c.catid
     WHERE d.did = ?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.json({ message: "No record found" });
      return res.json(result[0]);
    }
  );
}

// Insert disease
function insertDiseases(req, res) {
  const { catid, dname, dis_intro } = req.body;
  db.query(
    `INSERT INTO diseases (catid, dname, dis_intro, isActive, createdon)
     VALUES (?, ?, ?, 1, NOW())`,
    [catid, dname, dis_intro],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record inserted successfully" });
    }
  );
}

// Update disease
function updateDiseases(req, res) {
  const { id } = req.params;
  const { catid, dname, dis_intro } = req.body;

  db.query(
    `UPDATE diseases SET dname = ?, dis_intro = ?, catid = ? WHERE did = ?`,
    [dname, dis_intro, catid, id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record updated successfully" });
    }
  );
}

// Soft delete disease
function removeDiseases(req, res) {
  const { id } = req.params;
  db.query(
    `UPDATE diseases SET isActive = 0 WHERE did = ?`,
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record deleted successfully" });
    }
  );
}

module.exports = {
  getAll,
  getDiseasesById,
  insertDiseases,
  updateDiseases,
  removeDiseases,
};