const db=require("../config/db")
const multer=require("multer")
const path=require("path")
const fs=require("fs")
const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"doctor_image")
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage}).single("doc_img")

function insertDpro(req,res)
{
    upload(req,res,function(err){
        if(err)
        {
            return res.status(500).json(err)
        }
        const {did}=req.body
        const filename=req.file.filename
        db.query(`Insert into doctorpro(did,doc_img) values(?,?)`,[did,filename],(err)=>
        {
            if(err)
                return res.status(500).json(err)
            return res.status(200).json({Message:"Data inserted successfully"})
        })
    })
}

function updateDpro(req,res)
{
    upload(req,res,function(err){
        if(err)
        {
            return res.status(500).json(err)
        }
        const {dpro_id}=req.params
        let filepath="/gitpractice/amrinapi/nodeapi/doctor_image/"
        db.query(`Select doc_img from doctorpro where dpro_id=?`,[dpro_id],(err,result)=>{
            if(err)
                return res.status(500).json(err)
            const oimg=result[0].doc_img
            
            if(oimg)                    
            {
                filepath=filepath+oimg
                ///doctor_image/
                if(fs.existsSync(filepath))
                {       
                    fs.unlinkSync(filepath)
                }              
            }

            const {did}=req.body
            const filename=req.file.filename
            db.query(`Update doctorpro set doc_img=?,did=? where dpro_id=?`,
                [filename,did,dpro_id],(err,result)=>
            {
                if(err)
                    return res.status(500).json(err)
                return res.status(200).json({Message:"Data updated successfully"})
            })
        })

        
    })
}
    

function getDproById(req,res)
{
    const id=req.params.id 

    db.query(`Select dpro.doc_img,d.dname from doctorpro as dpro 
        inner join doctor as d on dpro.did=d.did where dpro_id=?`,[id],(err,result)=>
   
    
    
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            if(result.length==0)
                return res.json({messgae:"No record found"})
            return res.status(200).json(result)

        })
}
function getAllDpro(req,res)
{
    

    db.query(`Select dpro.doc_img,d.dname,d.quali,d.exp from doctorpro as dpro 
        inner join doctor as d on dpro.did=d.did`,(err,result)=>
   
    
    
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            if(result.length==0)
                return res.json({messgae:"No record found"})
            return res.status(200).json(result)

        })
}



function removeDpro(req,res)
{
    const id=req.params.id 
    db.query(`Update doctorpro set isActive=0 where dpro_id=?`,[id],(err)=>
   
    
    
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.status(200).json({message:"Record deleted"})

        })
}


module.exports={
    insertDpro,
    updateDpro,
    getDproById,
    removeDpro,
    getAllDpro
}