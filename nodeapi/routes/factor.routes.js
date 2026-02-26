const express=require ("express")
const router=express.Router()

const factorController=require("../controller/factor.controller")

router.post('/',factorController.InsertFactor)
router.put('/:id',factorController.UpdateFactor)
router.get('/:id',factorController.getById)
router.get('/',factorController.getALl)
router.delete('/:id',factorController.DeleteFactor)

module.exports=router