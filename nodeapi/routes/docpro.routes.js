const express=require("express")
const router=express.Router()
const dproController=require("../controller/docpro.controller")

router.post('/',dproController.insertDpro)
router.put('/:dpro_id',dproController.updateDpro)
router.get('/:id',dproController.getDproById)
router.get('/',dproController.getAllDpro)
router.put('/:id',dproController.removeDpro)

module.exports=router


