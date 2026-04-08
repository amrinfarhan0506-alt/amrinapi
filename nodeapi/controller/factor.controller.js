const db = require("../config/db");

// Get all active factors with cause name
function getAll(req, res) {
  db.query(
    `SELECT f.fac_id, f.fac_name, c.c_name AS cause_name, f.cause_id
     FROM factors AS f
     INNER JOIN cause AS c ON c.cause_id = f.cause_id
     WHERE f.isActive = 1`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json(result);
    }
  );
}

// Get factor by ID
function getById(req, res) {
  const { id } = req.params;
  db.query(
    `SELECT f.fac_id, f.fac_name, c.c_name AS cause_name, f.cause_id
     FROM factors AS f
     INNER JOIN cause AS c ON c.cause_id = f.cause_id
     WHERE f.fac_id = ? AND f.isActive = 1`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.json({ message: "Record not found" });
      return res.json(result[0]);
    }
  );
}

// Insert new factor
function insertFactor(req, res) {
  const { fac_name, cause_id } = req.body; // frontend sends fac_name & cause_id
  db.query(
    `INSERT INTO factors (fac_name, cause_id) VALUES (?, ?)`,
    [fac_name, cause_id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record inserted successfully" });
    }
  );
}

// Update factor
function updateFactor(req, res) {
  const { id } = req.params;
  const { fac_name, cause_id } = req.body;
  db.query(
    `UPDATE factors SET fac_name = ?, cause_id = ? WHERE fac_id = ?`,
    [fac_name, cause_id, id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record updated successfully" });
    }
  );
}

// Soft delete factor
function removeFactor(req, res) {
  const { id } = req.params;
  db.query(
    `UPDATE factors SET isActive = 0 WHERE fac_id = ?`,
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record deleted successfully" });
    }
  );
}

module.exports = {
  getAll,
  getById,
  insertFactor,
  updateFactor,
  removeFactor
};