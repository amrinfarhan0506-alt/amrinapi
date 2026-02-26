const express= require("express")
const router=express.Router()
const adController=require("../controller/admin.controller")
router.post('/',adController.check)
module.exports=router