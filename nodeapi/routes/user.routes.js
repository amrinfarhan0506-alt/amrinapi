const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/user.controllers");
// Define endpoints
router.get('/', usercontroller.getAll);
router.get('/:id',usercontroller.getuserById)
router.post('/',usercontroller.insertuser)
router.put('/:id',usercontroller.updateuser)

module.exports = router; //routes




