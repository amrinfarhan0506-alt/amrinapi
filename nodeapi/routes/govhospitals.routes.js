const express=require("express")
const router=express.Router()
const ctRouter=require("../controller/govhospitals.controller")


router.get('/',ctRouter.getAllGov)
router.get('/:id',ctRouter.getGovById)
router.post('/',ctRouter.insertGov)
router.put('/:id',ctRouter.updateGov)
router.patch('/:id',ctRouter.removeGov)

module.exports=router