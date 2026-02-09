const express=require("express")
const router=express.Router()
const hpController=require("../controller/hospital.controller")

router.get('/',hpController.getAllHp)
router.get('/:id',hpController.getHpById)
router.post('/',hpController.insertHp)
router.put('/:id',hpController.updateHp)
router.delete('/:id',hpController.removeHp)

module.exports=router
