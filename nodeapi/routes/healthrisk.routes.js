const express=require("express")
const router=express.Router()
const HRrouter=require("../controller/healthrisk.controller")

router.post('/',HRrouter.insertHRI)
router.put('/:hrid',HRrouter.updateHR)
router.get('/:hrid',HRrouter.getHRById)
router.get('/',HRrouter.getAll)
router.patch('/:hrid',HRrouter.removeHR)

module.exports=router


