const express = require("express");
const router = express.Router();
const causeController = require("../controller/cause.controller");

// ✅ Get all causes
router.get("/", causeController.getAll);

// ✅ Get cause by ID
router.get("/:id", causeController.getCauseById);

// ✅ Add new cause
router.post("/", causeController.insertCause);

// ✅ Update cause
router.put("/:id", causeController.updateCause);

// ✅ Soft delete cause
router.patch("/:id", causeController.removeCause);

module.exports = router;