const db=require("../config/db")
//Select query for specialization
function getAllOrg(req,res)
{
    db.query(`Select * from organ where isActive=1`,(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}

//select query by id
function getOrgById(req,res)
{
    const {id}=req.params
    db.query(`Select * from organ 
         where org_id=?`,[id],(err,result)=>
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
function insertOrg(req,res)
{
    const {org_name,catid,emoji}=req.body
    db.query(`Insert into organ(org_name,catid,emoji) 
        values(?,?,?)`,
        [org_name,catid,emoji],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for specialization
function updateOrg(req,res)
{
    const {id}=req.params
    const {org_name,catid}=req.body
    db.query("Update organ set org_name=?,catid=? where org_id=?",[org_name,catid,id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({message:"Record updated successfully"})
    })
}

//delete query for specialization
function removeOrg(req,res)
{
    const {id}=req.params
    db.query("update organ set isActive=0 where org_id=?",[id],(err)=>
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
    getAllOrg,
    getOrgById,
    insertOrg,
    updateOrg,
    removeOrg
}