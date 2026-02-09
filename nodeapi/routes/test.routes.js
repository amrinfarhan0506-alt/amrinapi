const express=require("express")
const router=express.Router()
const testController=require("../controller/test.controller")

router.get('/',testController.getAllTest)
router.get('/:id',testController.getTestById)
router.post('/',testController.insertTest)
router.put('/:id',testController.updateTest)
router.delete('/:id',testController.removeTest)

module.exports=router