const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookofpackage.controller");

router.get("/", bookingController.getAll);
router.post("/", bookingController.insertBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;