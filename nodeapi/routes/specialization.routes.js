const express=require("express")
const router=express.Router()
const speController=require("../controller/specialization.controller")


router.get('/',speController.getAllSpe)
router.get('/:id',speController.getSpeById)
router.post('/',speController.insertSpe)
router.put('/:id',speController.updateSpe)
router.delete('/:id',speController.removeSpe)

module.exports=router