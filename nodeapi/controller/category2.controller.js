const db=require("../config/db")
//api code
function getAll(req,res)
{
    /*wrting query*/
    db.query ("select * from category2",(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json(result);
    })
}
function getCatById(req,res)
{
    const {id}=req.params
    /*wrting query*/
    db.query ("select * from category2 where catid=?",[id],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"No record found"});
        return res.json(result);
    })
}
function insertCat(req,res)
{
    const {catname}=req.body
    /*wrting query*/
    db.query ("Insert into category2(catname) values(?)",[catname],(err,result)=>{
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record inserted successfully"});
        
    })
}

function updateCat(req,res)
{
    const {id}=req.params
    const {catname}=req.body
    /*wrting query*/
    db.query ("Update category2 set catname=? where catid=?",[catname,id],(err)=>{
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record updated successfully"});
        
    })
}
module.exports={
    getAll,
    getCatById,
    insertCat,
    updateCat
}