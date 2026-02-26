const db = require("../config/db")

function getALl(req,res)
{
    db.query(`select f.fac_id,f.fac_name,c.cause_name
         from factor as f 
         inner join cause as c
         on c.cause_id=f.cause_id`,(err,res)=>
         {
            if(err)
            {
                return res.status(5000).json(err)
            }
            return res.json(result)
         })
}

function getById(req,res)
{
    const {id}=req.params
    db.query(`select f.fac_id,f.fac_name,c.cause_name
         from factor as f 
         inner join cause as c
         on c.cause_id=f.cause_id
         where f.fac_id=? `,[id],(err)=>
        {
            if(err)
            {
                return res.status(5000).json(err)

            }
            if(result.length==0)
            {
                return res.json({message:"Record found successfully"})
            }
            return res.json(result[0])
         })
}
function InsertFactor(req,res)
{   const {fac_name,createdon,createdby,updatedon,updatedby,isActive}=req.body
    db.query(`insert into factor(fac_name,createdon,createdby,updatedon,updatedby.isactive) 
        values(?,?,?,?,?,?)`,[fac_name,createdon,createdby,updatedon,updatedby,isActive],(err)=>
        {
            if(err)
            {
                return res.status(5000).json(err)
            }
            return res.json({message:"Record insert sucessfully"})
        })
}

function UpdateFactor(req,res)
{
    const {id}=req.params
    const{fac_name}=req.body
    db.query(`update factor set fac_name=? where fac_id=?`,[fac_name,id],(err)=>
    {
        if(err)
        {
            return res.status(5000).json(err)
        }
        return res.json({message:"Record update successfully"})
    })
}
function DeleteFactor(req,res)
{
    const {id}=req.params
    db.query(`delete from factor where fac_id=?`,[id],(err)=>
    {
        if(err)
        {
            return res.status(5000).json(err)

        }
        return res.json({message:"Record deleted successfully"})
    })
}


module.exports=
{
    getALl,
    getById,
    InsertFactor,
    UpdateFactor,
    DeleteFactor
}