const db = require("../config/db");

// ================= GET ALL USERS =================
const getAll = (req, res) => {
    const sql = `
        SELECT 
            u.uid,
            u.fname,
            u.lname,
            u.email,
            u.contact,
            u.isActive,
            u.ctid,
            c.ctname
        FROM user u
        INNER JOIN city c ON u.ctid = c.ctid
        ORDER BY u.uid DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("GET ALL ERROR:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        return res.status(200).json({ success: true, data: result });
    });
};

// ================= GET USER BY ID =================
const getuserById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            u.uid,
            u.fname,
            u.lname,
            u.email,
            u.contact,
            u.isActive,
            u.ctid,
            c.ctname
        FROM user u
        INNER JOIN city c ON u.ctid = c.ctid
        WHERE u.uid = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("GET BY ID ERROR:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, data: result[0] });
    });
};

// ================= INSERT USER =================
const insertuser = (req, res) => {
    const { fname, lname, contact, email, password, isActive, ctid } = req.body;

    if (!fname || !lname || !email || !contact || !password || !ctid) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const sql = `
        INSERT INTO user (fname, lname, contact, email, password, isActive, ctid)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [fname, lname, contact, email, password, isActive || 1, ctid],
        (err, result) => {
            if (err) {
                console.error("INSERT ERROR:", err);
                return res.status(500).json({ success: false, message: "Insert failed" });
            }

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                userId: result.insertId
            });
        }
    );
};

// ================= UPDATE USER =================
const updateuser = (req, res) => {
    const { id } = req.params;
    const { fname, lname, contact, email, password, isActive, ctid } = req.body;

    if (!fname || !lname || !email || !contact || !password || !ctid) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const sql = `
        UPDATE user
        SET fname = ?, 
            lname = ?, 
            contact = ?, 
            email = ?, 
            password = ?, 
            isActive = ?, 
            ctid = ?
        WHERE uid = ?
    `;

    db.query(
        sql,
        [fname, lname, contact, email, password, isActive || 1, ctid, id],
        (err, result) => {
            if (err) {
                console.error("UPDATE ERROR:", err);
                return res.status(500).json({ success: false, message: "Update failed" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({
                success: true,
                message: "User updated successfully"
            });
        }
    );
};


module.exports = {
    getAll,
    getuserById,
    insertuser,
    updateuser,
    
};