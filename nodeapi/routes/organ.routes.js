const express= require("express")
const router=express.Router()
const orgController=require("../controller/organ.controller")
router.get('/',orgController.getAllOrg)
router.get('/:id',orgController.getOrgById)
router.post('/',orgController.insertOrg)
router.put('/:id',orgController.updateOrg)
router.patch('/:id',orgController.removeOrg)

module.exports=router