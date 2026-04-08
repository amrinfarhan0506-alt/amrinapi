const db=require("../config/db")
//api code
function getAll(req,res)
{
    /*wrting query*/
    db.query ("select n.nid,n.n_name,c.ctname,n.address,n.contact,n.email from ngo as n inner join city as c on n.nid = c.ctid where n.isActive=1 ",(err,result)=>{
        if(err){
            return res.status(500).json(err)
            }
        return res.json(result);
    })
}
function getngoById(req, res) {
    const { id } = req.params; // only use the ID from params

    db.query(
        `SELECT n.n_name, c.ctname, n.address, n.contact, n.email
         FROM ngo AS n
         INNER JOIN city AS c ON n.ctid = c.ctid
         WHERE n.nid = ?`,
        [id], // only pass the ID
        (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.json({ Message: "No record found" });
            }

            return res.json(result);
        }
    );
}function insertngo(req,res)
{
    const {n_name,ctid,address,contact,email}=req.body
    /*wrting query*/
    db.query (`Insert into ngo(n_name,ctid,address,contact,email) values(?,?,?,?,?)`,[n_name,ctid,address,contact,email],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record inserted successfully"});
        
    })
}

function updatengo(req,res)
{
    const {id}=req.params
    const {n_name,ctid,address,contact,email}=req.body
    /*wrting query*/
    db.query ("Update ngo set n_name=?,ctid=?,address=?,contact=?,email=? where nid=?",[n_name,ctid,address,contact,email,id],(err)=>{
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record updated successfully"});
        
    })
}
//delete query for test

function removengo(req,res)
{
    const {id}=req.params
    db.query("update ngo set isActive=0 where nid=?",[id],(err)=>
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
    getngoById,
    insertngo,
    updatengo,
    removengo
}