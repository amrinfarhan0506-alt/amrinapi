const db=require("../config/db")
//api code
function getAll(req,res)
{
    /*wrting query*/
    db.query ("select n.nid,n.n_name,c.ctname,n.address,n.contact,n.email,n.createdon from ngo as n inner join city as c on n.nid = c.ctid ",(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json(result);
    })
}
function getngoById(req,res)
{
    const {id}=req.params
    /*wrting query*/
    db.query ("select n.nid,n.n_name,c.ctname,n.address,n.contact,n.email,n.createdon from ngo as n inner join city as c on n.nid = c.ctid where nid=?",[id],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"record found"});
        return res.json(result);
    })
}
function insertngo(req,res)
{
    const {n_name,address,contact,email,createdon,createdby,updatedon,updatedby,isActive}=req.body
    /*wrting query*/
    db.query (`Insert into ngo(n_name,address,contact,email,createdon,createdby,updatedon,updatedby,isActive) values(?,?,?,?,?,?,?,?,?)`,[n_name,address,contact,email,createdon,createdby,updatedon,updatedby,isActive],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record inserted successfully"});
        
    })
}

function updatengo(req,res)
{
    const {id}=req.params
    const {n_name,address,contact,email,createdon,createdby,updatedon,updatedby,isActive}=req.body
    /*wrting query*/
    db.query ("Update ngo set nname=? where nid=?",[n_name,address,contact,email,createdon,createdby,updatedon,updatedby,isActive],(err)=>{
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record updated successfully"});
        
    })
}
//delete query for test
/*
function removeuser(req,res)
{
    const {id}=req.params
    db.query("Delete from user where test_id=?",[id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record deleted successfully"})
    })
}
    */

module.exports=
{
    getAll,
    getngoById,
    insertngo,
    updatengo,
    
}