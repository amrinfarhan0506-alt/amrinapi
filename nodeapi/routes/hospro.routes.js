const express=require("express")
const router=express.Router()
const hproController=require("../controller/hospro.controller")

router.post('/',hproController.insertHpro)
router.put('/:hpro_id',hproController.updateHpro)
router.get('/:id',hproController.getHproById)
router.put('/:id',hproController.removeHpro)

module.exports=router


