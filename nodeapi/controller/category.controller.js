const db=require("../config/db")
//Select query for category
function getAllCat(req,res)
{
    db.query("select * from category",(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        return res.json(result);
    })
}
//Select query for category by id
function getCatById(req,res)
{
    const {id}=req.params
    db.query("Select * from category where catid=?",[id],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        if(result.length==0)
        {
            return res.json({Message:"No Record Found"})
        }
        return res.json(result);
    })
}

//Insert query for category

function insertCat(req,res)
{
    const {catname}=req.body
    db.query("Insert into category(catname) values(?)",[catname],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        return res.json({Message:"Record inserted successsfully"});
    })
}
//update query for category

function updateCat(req,res)
{
    const {id}=req.params
    const {catname}=req.body
    db.query("Update category set catname=? where catid=?",[catname,id],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        return res.json({Message:"Record updated successsfully"});
    })
}

//delete query for category
function removeCat(req,res)
{
    const {id}=req.params
    db.query("Delete from category where catid=?",[id],(err)=>
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
    getAllCat,
    getCatById,
    insertCat,
    updateCat,
    removeCat
}