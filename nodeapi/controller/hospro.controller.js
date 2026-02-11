const db=require("../config/db")
const multer=require("multer")
const path=require("path")
const fs=require("fs")
const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"hospital_image")
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage}).single("hp_img")

function insertHpro(req,res)
{
    upload(req,res,function(err){
        if(err)
        {
            return res.status(500).json(err)
        }
        const {hpid}=req.body
        const {filename}=req.file
        db.query(`Insert into hospro(hpid,hp_img) values(?,?)`,[hpid,filename],(err)=>
        {
            if(err)
                return res.status(500).json(err)
            return res.status(200).json({Message:"Data inserted successfully"})
        })
    })
}

function updateHpro(req,res)
{
    upload(req,res,function(err){
        if(err)
        {
            return res.status(500).json(err)
        }
        const {hpro_id}=req.params
        let filepath="/gitpractice/amrinapi/nodeapi/hospital_image/"
        db.query(`Select hp_img from hospro where hpro_id=?`,[hpro_id],(err,result)=>{
            if(err)
                return res.status(500).json(err)
            const oimg=result[0].hp_img
            
            if(oimg)                    
            {
                filepath=filepath+oimg
                ///hospital_image/
                if(fs.existsSync(filepath))
                {       
                    fs.unlinkSync(filepath)
                }              
            }

            const {hpid}=req.body
            const filename=req.file.filename 
            db.query(`Update hospro set hp_img=?,hpid=? where hpro_id=?`,
                [filename,hpid,hpro_id],(err,result)=>
            {
                if(err)
                    return res.status(500).json(err)
                return res.status(200).json({Message:"Data updated successfully"})
            })
        })

        
    })
}
    

function getHproById(req,res)
{
    const id=req.params.id 

    db.query(`Select hpro.hp_img,h.hpname from hospro as hpro 
        inner join hospital as h on hpro.hpid=h.hpid where hpro_id=?`,[id],(err,result)=>
   
    
    
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.status(200).json(result)

        })
}

function removeHpro(req,res)
{
    const id=req.params.id 
    db.query(`Update hospro set isActive=0 where hpro_id=?`,[id],(err)=>
   
    
    
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.status(200).json({message:"Record deleted"})

        })
}


module.exports={
    insertHpro,
    updateHpro,
    getHproById,
    removeHpro
}