const express= require("express")
const router=express.Router()
const stateController=require("../controller/symptom.controller")
router.get('/',stateController.getAllSym)
router.get('/:id',stateController.getSymById)
router.post('/',stateController.insertSym)
router.put('/:id',stateController.updateSym)
router.patch('/:id',stateController.removeSym)

module.exports=router