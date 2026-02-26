const db=require("../config/db")
//Select query for specialization
function getAllSpe(req,res)
{
    db.query(`Select * from specialization`,(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}

//select query by id
function getSpeById(req,res)
{
    const {id}=req.params
    db.query(`Select * from specialization 
         where spid=?`,[id],(err,result)=>
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
//insert query for specialization
function insertSpe(req,res)
{
    const {spid,spname,createdon,createdby,isActive}=req.body
    db.query(`Insert into specialization(spid,spname,createdon,createdby,isActive) 
        values(?,?,?,?,?)`,
        [spid,spname,createdon,createdby,isActive],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for specialization
function updateSpe(req,res)
{
    const {id}=req.params
    const {spname,updatedon,updatedby,isActive}=req.body
    db.query("Update specialization set spname=?,updatedon=?,updatedby=?,isActive=? where spid=?",[spname,updatedon,updatedby,isActive,id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({message:"Record updated successfully"})
    })
}

//delete query for specialization
function removeSpe(req,res)
{
    const {id}=req.params
    db.query("Delete from specialization where spid=?",[id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record deleted successfully"})
    })
}
module.exports=
{
    getAllSpe,
    getSpeById,
    insertSpe,
    updateSpe,
    removeSpe
}