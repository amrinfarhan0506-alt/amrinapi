const db=require("../config/db")
function getAll(req,res)
{
    db.query(`Select c.c_name,d.dname
         from cause as c
         inner join diseases as d on d.did=c.did`,(err,result)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.json(result)

         })
}



function getcauseById(req,res)
{
    const {id}=req.params
    db.query(`Select c.c_name,d.dname 
        from cause as c 
        inner join diseases as d on d.did=c.did 
        where c.cause_id=?`,[id],(err)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            if(result.length==0)
            {
                return res.json({message:"Record not found"})
            }
            return res.json(result[0])
        })
}
function Insertcause(req,res)
{
    
    const {cause_name,dname,createdon,createdby,updatedon,updatedby,isActive}=req.body
    db.query(`insert into cause (c_name,dname,createdon,createdby,updatedon,updatedby,isActive)
        values(?,?,?,?,?,?,?)`,[cause_name,dname,createdon,createdby,updatedon,updatedby,isActive],(err)=>
        {
            if(err)
            {
            return res.status(500).json(err)
            }
            return res.json({message:"record inserted successfully"})
        })
}

function updateCause(req,res)
{
    const{id}=req.params
    const{cause_name}=req.body
    db.query(`update cause set c_name=? where cause_id=?`,[cause_name,id],(err)=>{
        if(err)
        {
            return res.status(500).json
        }
        return res.json({message:"Update record successfully"})
    })
}

function removeCause(req,res)
{
    const{id}=req.params
    db.query(`delete from cause where cause_id=?`,[id],(err)=>{
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({message:"Record deleted successfully"})
    })
}

module.exports={
    getAll,
    getcauseById,
    Insertcause,
    updateCause,
    removeCause
}