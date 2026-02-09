const express=require("express")
const router=express.Router()
const ctRouter=require("../controller/city.controller")


router.get('/',ctRouter.getCityAll)
router.get('/:id',ctRouter.getCityById)
router.post('/',ctRouter.insertCity)
router.put('/:id',ctRouter.updateCity)
router.delete('/:id',ctRouter.removeCity)

module.exports=router