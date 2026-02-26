const express = require("express");
const router = express.Router();
const ngocontroller = require("../controllers/ngo.controller");
// Define endpoints
router.get('/', ngocontroller.getAll);
router.get('/:id',ngocontroller.getngoById)
router.post('/',ngocontroller.insertngo)
router.put('/:id',ngocontroller.updatengo)

module.exports = router; //routes




