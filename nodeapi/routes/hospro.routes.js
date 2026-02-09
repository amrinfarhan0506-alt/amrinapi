const express=require("express")
const router=express.Router()
const hproController=require("../controller/hospro.controller")

const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"hospital_image");
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage})
router.post('/',upload.single("image"),hproController.imgUpload)
module.exports=router