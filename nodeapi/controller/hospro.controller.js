/*const db=require("../config/db")

//select query by id
function getHproById(req,res)
{
    const {id}=req.params
    db.query(`Select hp.hpro_id,h.hpname,hp.hp_img
        from hospro as hp
        inner join hospital as h 
        on hp.hpid=h.hpid
        where hpid=?`,[id],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        if(result.length==0)
        {
            return res.json({Message:"No Record Found"})
        }
        return res.json(result[0])
    })
}
//insert query for hospital
function insertHpro(req,res)
{
    const {hp}=req.body
    db.query(`Insert into hospital(hpname,hp_address,email,contact,
        regno,ctid) 
        values(?,?,?,?,?,?)`,
        [hpname,hp_address,email,contact,regno,ctid],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for hospital
function updateHpro(req,res)
{
    const {id}=req.params
    const {hp_name,ctid,hp_address,email,contact,regno,updatedon,updatedby,isActive}=req.body
    db.query(`Update hospital set hpname=?,hp_address=?,email=?,contact=?,
        regno=?,ctid=?,updatedon=?,updatedby=?,isActive=? where hpid=?`,[hp_name,ctid,hp_address,email,contact,regno,updatedon,updatedby,isActive,id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record updated successfully"})
    })
}
*/
function imgUpload(req,res)
{
    if(!req.file)
    {
        return res.status(500).json({message:"No file uploaded"})
    }
    return res.status(200).json({message:"File uploaded successfully",filename:req.file.filename})
}


module.exports=
{
 /*   
    getHproById,
    insertHpro,
    updateHpro,
    */
    imgUpload
}