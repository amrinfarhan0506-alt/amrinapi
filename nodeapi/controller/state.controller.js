const db=require("../config/db")
//Select query for state
function getAll(req,res)
{
    db.query("Select * from state where isActive=1",(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}

//select query by id
function getStateById(req,res)
{
    const {id}=req.params
    db.query("Select * from state where sid=? and isActive=1",[id],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        if(result.length==0)
        {
            return res.json({Message:"No Record Found"})
        }
        return res.json(result)
    })
}
//insert query for state
function insertState(req,res)
{
    const {sname,createdon,createdby,updatedon,updatedby}=req.body
    db.query(`Insert into state(sname) 
        values(?)`,
        [sname],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for state
function updateState(req,res)
{
    const {id}=req.params
    const {sname}=req.body
    db.query("Update state set sname=? where sid=?",[sname,id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record updated successfully"})
    })
}

//delete query for city
function removeState(req,res)
{
    const {id}=req.params
    db.query("update state set isActive=0 where sid=?",[id],(err)=>
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
    getAll,
    getStateById,
    insertState,
    updateState,
    removeState
}