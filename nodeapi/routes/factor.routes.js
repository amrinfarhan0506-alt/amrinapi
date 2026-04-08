const express = require("express");
const router = express.Router();
const factorController = require("../controller/factor.controller");

// Use method names exactly as exported
router.post("/", factorController.insertFactor);
router.put("/:id", factorController.updateFactor);
router.get("/:id", factorController.getById);
router.get("/", factorController.getAll);
router.patch("/:id", factorController.removeFactor); // soft delete using PATCH

module.exports = router;