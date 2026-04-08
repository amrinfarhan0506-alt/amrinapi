const express = require("express");
const router = express.Router();
const subfactorController = require("../controller/subfactor.controller");

// Get all active subfactors
router.get("/", subfactorController.getAll);

// Get a subfactor by ID
router.get("/:id", subfactorController.getSubfactorById);

// Insert a new subfactor
router.post("/", subfactorController.insertSubfactor);

// Update an existing subfactor
router.put("/:id", subfactorController.updateSubfactor);

// Soft delete a subfactor
router.patch("/:id", subfactorController.removeSubfactor);

module.exports = router;