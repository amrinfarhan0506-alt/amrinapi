const express=require("express")
const router=express.Router()
const causeController=require("../controller/cause.controller")

router.post('/',causeController.Insertcause)
router.put('/:id',causeController.updateCause)
router.get('/:id',causeController.getcauseById)
router.get('/',causeController.getAll)
router.delete('/:id',causeController.removeCause)

module.exports=router


