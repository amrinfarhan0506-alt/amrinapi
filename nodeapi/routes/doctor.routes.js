const express=require("express")
const router=express.Router()
const docController=require("../controller/doctor.controller")

router.get('/',docController.getAllDoc)
router.get('/:id',docController.getDocById)
router.post('/',docController.insertDoc)
router.put('/:id',docController.updateDoc)
router.delete('/:id',docController.removeDoc)

module.exports=router
