const express= require("express")
const router=express.Router()
const catController=require("../controller/category.controller")
router.get('/',catController.getAllCat)
router.get('/:id',catController.getCatById)
router.post('/',catController.insertCat)
router.put('/:id',catController.updateCat)
router.delete('/:id',catController.removeCat)

module.exports=router