const express = require("express");
const router = express.Router();
const catcontroller = require("../controllers/category2.controller");
// Define endpoints
router.get('/', catcontroller.getAll);
router.get('/:id',catcontroller.getCatById)
router.post('/',catcontroller.insertCat)
router.put('/:id',catcontroller.updateCat)
module.exports = router;