const express= require("express")
const router=express.Router()
const stateController=require("../controller/state.controller")
router.get('/',stateController.getAll)
router.get('/:id',stateController.getStateById)
router.post('/',stateController.insertState)
router.put('/:id',stateController.updateState)
router.delete('/:id',stateController.removeState)

module.exports=router