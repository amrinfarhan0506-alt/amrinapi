const db=require("../config/db")
//Select query for city
function getAllGov(req,res)
{
    db.query(`Select * from govhospital where isActive=1`,(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}

//select query by id
function getGovById(req,res)
{
    const {id}=req.params
    db.query(`Select * from govhospital where gov_hid=?`,[id],(err,result)=>
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
//insert query for city
function insertGov(req,res)
{
    const {state_name,hname,h_address}=req.body
    db.query(`Insert into govhospital(state_name,hname,h_address) 
        values(?,?,?)`,
        [state_name,hname,h_address],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for city
function updateGov(req,res)
{
    const {id}=req.params
    const {state_name,hname,h_address}=req.body
    db.query("Update govhospital set state_name=?,hname=?,h_address=? where gov_hid=?",[state_name,hname,h_address,id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({message:"Record updated successfully"})
    })
}

//delete query for city
function removeGov(req,res)
{
    const {id}=req.params
    db.query("update govhospital set isActive=0 where gov_hid=?",[id],(err)=>
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
    getAllGov,
    getGovById,
    insertGov,
    updateGov,
    removeGov
}