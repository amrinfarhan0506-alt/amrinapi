const db=require("../config/db")
function getAll(req,res)
{
    db.query(`Select c.cause_name,d.dname
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
    db.query(`Select c.cause_name,d.dname 
        from cause as c 
        inner join diseases as d on d.did=c.did 
        where c.cause_id=?,`,[id],(err)=>
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
    const{id}=req.params
    const {cause_name,dname,createdon,createdby,updatedon,updatedby,isActive}=req.body
    db.query(`insert into cause (cause_name,dname,createdon,createdby,updatedon,updatedby,isActive)
        values(?,?,?,?,?,?,?)`,[cause_name,dname,createdon,createdby,updatedon,updatedby,isActive],(err)=>
        {
            if(err)
            {
            return res.status(500).json(err)
            }
            return res.json({message:"record inserted successfully"})
        })
}