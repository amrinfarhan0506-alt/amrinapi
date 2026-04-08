const db=require("../config/db")
//Select query for specialization
function getAllSpe(req,res)
{
    db.query(`Select * from specialization where isActive=1`,(err,result)=>
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
    const {spname}=req.body
    db.query(`Insert into specialization(spname) 
        values(?)`,
        [spname],(err)=>
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
    const {spname}=req.body
    db.query("Update specialization set spname=? where spid=?",[spname,id],(err)=>
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
    db.query("update specialization set isActive=0 where spid=?",[id],(err)=>
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