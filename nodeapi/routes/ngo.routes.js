const express = require("express");
const router = express.Router();
const ngocontroller = require("../controller/ngo.controller");
// Define endpoints
router.get('/', ngocontroller.getAll);
router.get('/:id',ngocontroller.getngoById)
router.post('/',ngocontroller.insertngo)
router.put('/:id',ngocontroller.updatengo)
router.patch('/:id',ngocontroller.removengo)


module.exports = router; //routes




