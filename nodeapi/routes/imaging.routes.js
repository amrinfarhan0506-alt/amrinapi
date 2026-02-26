const express=require("express")
const router=express.Router()
const imagingController=require("../controllers/imaging.controller")

router.get("/",imagingController.getAllimaging)
router.get("/:id",imagingController.getimagingById)
router.post("/",imagingController.insertimaging)
router.put("/:id",imagingController.updateImaging)
router.delete("/:id",imagingController.deleteImaging)

module.exports=router