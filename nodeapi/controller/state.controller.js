const db=require("../config/db")
//Select query for state
function getAll(req,res)
{
    db.query("Select * from state",(err,result)=>
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
    db.query("Select * from state where sid=?",[id],(err,result)=>
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
    const {sname,createdon,createdby,updatedon,updatedby,isActive}=req.body
    db.query(`Insert into state(sname,createdon,createdby,updatedon,updatedby,isActive) 
        values(?,?,?,?,?,?)`,
        [sname,createdon,createdby,updatedon,updatedby,isActive],(err)=>
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
    const {sname,updatedon,updatedby,isActive}=req.body
    db.query("Update state set sname=?,updatedon=?,updatedby=?,isActive=? where sid=?",[sname,updatedon,updatedby,isActive,id],(err)=>
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
    db.query("Delete from state where sid=?",[id],(err)=>
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