const db=require("../config/db")
//Select query for city
function getCityAll(req,res)
{
    db.query(`Select c.ctid,c.ctname,s.sname
         from city as c
         inner join state as s on c.sid=s.sid`,(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}

//select query by id
function getCityById(req,res)
{
    const {id}=req.params
    db.query(`Select c.ctid,c.ctname,s.sname
         from city as c
         inner join state as s on c.sid=s.sid 
         where ctid=?`,[id],(err,result)=>
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
function insertCity(req,res)
{
    const {sid,ctname,createdon,createdby,isActive}=req.body
    db.query(`Insert into city(sid,ctname,createdon,createdby,isActive) 
        values(?,?,?,?,?)`,
        [sid,ctname,createdon,createdby,isActive],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for city
function updateCity(req,res)
{
    const {id}=req.params
    const {ctname}=req.body
    db.query("Update city set ctname=? where ctid=?",[ctname,id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({message:"Record updated successfully"})
    })
}

//delete query for city
function removeCity(req,res)
{
    const {id}=req.params
    db.query("Delete from city where ctid=?",[id],(err)=>
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
    getCityAll,
    getCityById,
    insertCity,
    updateCity,
    removeCity
}