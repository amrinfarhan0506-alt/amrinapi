const db = require("../config/db");

// Get all active subfactors with full hierarchy (category → disease → cause → factor → subfactor)
function getAll(req, res) {
  db.query(
    `SELECT 
        cat.catid,
        cat.catname,
        d.did,
        d.dname AS disease_name,
        d.dis_intro,
        c.cause_id,
        c.c_name AS cause_name,
        f.fac_id,
        f.fac_name AS factor_name,
        sb.sb_id,
        sb.subfactor_name,
        sb.subfactor_reasons
    FROM 
        category AS cat
    INNER JOIN diseases AS d ON cat.catid = d.catid
    INNER JOIN cause AS c ON d.did = c.did
    INNER JOIN factors AS f ON c.cause_id = f.cause_id
    INNER JOIN subfactor AS sb ON f.fac_id = sb.fac_id
    WHERE 
        d.isActive = 1
      AND cat.isActive = 1
      AND c.isActive = 1
      AND f.isActive = 1
      AND sb.isActive = 1`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json(result);
    }
  );
}

// Get subfactor by ID
function getSubfactorById(req, res) {
  const { id } = req.params;
  db.query(
    `SELECT 
        sb.sb_id,
        sb.subfactor_name,
        sb.subfactor_reasons,
        sb.fac_id,
        f.fac_name
    FROM subfactor AS sb
    INNER JOIN factors AS f ON f.fac_id = sb.fac_id
    WHERE sb.sb_id = ? AND sb.isActive = 1`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.json({ message: "Record not found" });
      return res.json(result[0]);
    }
  );
}

// Insert new subfactor
function insertSubfactor(req, res) {
  const { subfactor_name, fac_id, subfactor_reasons } = req.body;
  db.query(
    `INSERT INTO subfactor(subfactor_name, fac_id, subfactor_reasons)
     VALUES (?, ?, ?)`,
    [subfactor_name, fac_id, subfactor_reasons],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record inserted successfully" });
    }
  );
}

// Update subfactor
function updateSubfactor(req, res) {
  const { id } = req.params;
  const { subfactor_name, fac_id, subfactor_reasons } = req.body;
  db.query(
    `UPDATE subfactor SET subfactor_name = ?, fac_id = ?, subfactor_reasons = ?
     WHERE sb_id = ?`,
    [subfactor_name, fac_id, subfactor_reasons, id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record updated successfully" });
    }
  );
}

// Soft delete subfactor
function removeSubfactor(req, res) {
  const { id } = req.params;
  db.query(
    `UPDATE subfactor SET isActive = 0 WHERE sb_id = ?`,
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Record deleted successfully" });
    }
  );
}

module.exports = {
  getAll,
  getSubfactorById,
  insertSubfactor,
  updateSubfactor,
  removeSubfactor,
};