const db = require("../config/db");

// Get all active causes with disease name
function getAll(req, res) {
  db.query(
    `SELECT c.c_name, c.c_cure, c.c_prevention, c.cause_id, d.dname, c.did
     FROM cause AS c
     INNER JOIN diseases AS d ON d.did = c.did
     WHERE c.isActive = 1`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json(result);
    }
  );
}

// Get cause by ID
function getCauseById(req, res) {
  const { id } = req.params;
  db.query(
    `SELECT c.c_name, c.c_cure, c.c_prevention, c.cause_id, d.dname, c.did
     FROM cause AS c
     INNER JOIN diseases AS d ON d.did = c.did
     WHERE c.cause_id = ? AND c.isActive = 1`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.json({ message: "Record not found" });
      return res.json(result[0]);
    }
  );
}

// Insert new cause
function insertCause(req, res) {
  const { c_name, c_cure, c_prevention, did } = req.body; // frontend sends these
  db.query(
    `INSERT INTO cause (c_name, c_cure, c_prevention, did)
     VALUES (?, ?, ?, ?)`,
    [c_name, c_cure, c_prevention, did],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record inserted successfully" });
    }
  );
}

// Update cause
function updateCause(req, res) {
  const { id } = req.params;
  const { c_name, c_cure, c_prevention, did } = req.body;
  db.query(
    `UPDATE cause 
     SET c_name = ?, c_cure = ?, c_prevention = ?, did = ? 
     WHERE cause_id = ?`,
    [c_name, c_cure, c_prevention, did, id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record updated successfully" });
    }
  );
}

// Soft delete cause
function removeCause(req, res) {
  const { id } = req.params;
  db.query(
    `UPDATE cause SET isActive = 0 WHERE cause_id = ?`,
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record deleted successfully" });
    }
  );
}

module.exports = {
  getAll,
  getCauseById,
  insertCause,
  updateCause,
  removeCause,
};