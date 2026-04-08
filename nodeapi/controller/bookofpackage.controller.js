const db = require("../config/db");

// ==============================
// GET ALL BOOKINGS (JOIN USER + PACKAGE)
// ==============================
function getAll(req, res) {
  const sql = `
    SELECT 
      b.bid,
      u.uid,
      CONCAT(u.fname, ' ', u.lname) AS username,
      u.email,
      p.pid,
      p.pname,
      p.price
    FROM booking b
    INNER JOIN user u ON b.uid = u.uid
    INNER JOIN packages p ON b.pid = p.pid
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
}

// ==============================
// INSERT
// ==============================
function insertBooking(req, res) {
  const { uid, pid } = req.body;

  const sql = `INSERT INTO booking (uid, pid) VALUES (?, ?)`;

  db.query(sql, [uid, pid], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Booking added successfully" });
  });
}

// ==============================
// UPDATE
// ==============================
function updateBooking(req, res) {
  const { id } = req.params;
  const { uid, pid } = req.body;

  const sql = `UPDATE booking SET uid=?, pid=? WHERE bid=?`;

  db.query(sql, [uid, pid, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Booking updated successfully" });
  });
}

// ==============================
// DELETE
// ==============================
function deleteBooking(req, res) {
  const { id } = req.params;

  db.query("DELETE FROM booking WHERE bid=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Booking deleted successfully" });
  });
}

module.exports = {
  getAll,
  insertBooking,
  updateBooking,
  deleteBooking,
};