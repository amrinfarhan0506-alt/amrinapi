const db=require("../config/db")
//api code
function getAll(req,res)
{
    /*wrting query*/
    db.query ("select u.uid,u.fname,u.lname,u.email,u.contact,c.cityname from user as u inner join city as c on u.uid = c.cid ",(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json(result);
    })
}
function getuserById(req,res)
{
    const {id}=req.params
    /*wrting query*/
    db.query ("select u.uid,u.fname,u.lname,u.email,u.contact,c.cityname from user as u inner join city as c on u.uid = c.cid where uid=?",[id],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"record found"});
        return res.json(result);
    })
}
function insertuser(req,res)
{
    const {fname,lname,contact,email,password,isActive}=req.body
    /*wrting query*/
    db.query (`Insert into user(fname,lname,contact,email,password,isActive) values(?.?)`,[fname,lname,contact,email,password,isActive],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record inserted successfully"});
        
    })
}

function updateuser(req,res)
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
    getuserById,
    insertuser,
    updateuser,
    
}