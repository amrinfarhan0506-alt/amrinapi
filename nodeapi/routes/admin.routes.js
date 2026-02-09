const express= require("express")
const router=express.Router()
const adController=require("../controller/admin.controller")
router.get('/',adController.getAll)
module.exports=router