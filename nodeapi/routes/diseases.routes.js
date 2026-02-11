const express=require("express")
const router=express.Router()
const disrouter= require("../controller/diseases.controller")

 router.get('/',disrouter.getAll)
 router.get('/:id',disrouter. getDiseasesById)
 router.put('/:id',disrouter.updateDiseases)
 router.delete('/:id',disrouter.removeDiseases)
 router.post('/',disrouter.InsertDiseases)

 module.exports=router





 
   