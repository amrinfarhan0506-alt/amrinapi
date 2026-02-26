const db=require("../config/db")

function getAll(req,res)
{
    db.query("select * from admin",(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        return res.json(result);
    })
}

function check(req,res)
{  
    const{email,password}=req.body;
    db.query(`select * from admin
        where email=? and password=?
        `,[email,password],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }

        if(result.length==0)
            return res.json({message:false})
        else
            return res.json({message:true})
    })
}
module.exports=
{
    getAll,
    check
}