const db = require("../config/db");

// ================= GET ALL PACKAGES =================
function getAllPackages(req, res) {
    db.query(`
        SELECT 
            p.pid,
            p.pname,
            p.no_of_test,
            p.fast,
            p.reports,
            p.recommended,
            p.price,
            p.test_id,
            p.hpid,
            t.testname,
            h.hpname
        FROM packages p
        JOIN test t ON p.test_id = t.test_id
        JOIN hospital h ON p.hpid = h.hpid
    `, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.json(result);
    });
}


// ================= GET PACKAGE BY ID =================
function getPackageById(req, res) {
    const { id } = req.params;

    db.query(`
        SELECT 
            p.*,
            t.testname,
            h.hpname
        FROM packages p
        JOIN test t ON p.test_id = t.test_id
        JOIN hospital h ON p.hpid = h.hpid
        WHERE p.pid = ?
    `, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.json({ Message: "No Record Found" });
        }

        return res.json(result[0]);
    });
}


// ================= INSERT PACKAGE =================
function insertPackage(req, res) {

    const { pname, no_of_test, test_id, fast, hpid, reports, recommended, price } = req.body;

    db.query(
        `INSERT INTO packages 
        (pname, no_of_test, test_id, fast, hpid, reports, recommended, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [pname, no_of_test, test_id, fast, hpid, reports, recommended, price],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            return res.json({ Message: "Package Added Successfully" });
        }
    );
}


// ================= UPDATE PACKAGE =================
function updatePackage(req, res) {

    const { id } = req.params;
    const { pname, no_of_test, test_id, fast, hpid, reports, recommended, price } = req.body;

    db.query(
        `UPDATE packages 
         SET pname=?, no_of_test=?, test_id=?, fast=?, hpid=?, reports=?, recommended=?, price=? 
         WHERE pid=?`,
        [pname, no_of_test, test_id, fast, hpid, reports, recommended, price, id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            return res.json({ Message: "Package Updated Successfully" });
        }
    );
}


// ================= DELETE PACKAGE =================
function deletePackage(req, res) {

    const { id } = req.params;

    db.query("DELETE FROM packages WHERE pid=?", [id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.json({ Message: "Package Deleted Successfully" });
    });
}


module.exports = {
    getAllPackages,
    getPackageById,
    insertPackage,
    updatePackage,
    deletePackage
};