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
module.exports=
{
    getAll
}