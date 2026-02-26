const db=require("../config/db")
//api code
function getAll(req,res)
{
    /*wrting query*/
    db.query ("select b.bid u.uname p.pname from booking as b inner join packages as p on b.bid = p.pid  ",(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json(result);
    })
}
function getbookofpackageById(req,res)
{
    const {id}=req.params
    /*wrting query*/
    db.query ("select b.bid u.uname p.pname from booking as b inner join packages as p on b.bid = p.pid where nid=?",[id],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"record found"});
        return res.json(result);
    })
}
function insertbookofpackage(req,res)
{
    const {fname,lname,contact,email,password,isActive}=req.body
    /*wrting query*/
    db.query (`Insert into user(fname,lname,contact,email,password,isActive) values(?.?)`,[fname,lname,contact,email,password,isActive],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record inserted successfully"});
        
    })
}

function updatebookofpackage(req,res)
{
    const {id}=req.params
    const {fname,lname,contact,email,password,isActive}=req.body
    /*wrting query*/
    db.query ("Update user set fname=? where uid=?",[fname,lname,contact,email,password,isActive],(err)=>{
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
    getbookofpackageById,
    insertbookofpackage,
    updatebookofpackage,
    
}