const db=require("../config/db")
//Select query for test
function getAllTest(req,res)
{
    db.query(`Select * from test where isActive=1`,(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}

//select query by id
function getTestById(req,res)
{
    const {id}=req.params
    db.query(`Select * from test 
         where test_id=?`,[id],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        if(result.length==0)
        {
            return res.json({Message:"No Record Found"})
        }
        return res.json(result[0])
    })
}
//insert query for test
function insertTest(req,res)
{
    const {testname}=req.body
    db.query(`Insert into test(testname) 
        values(?)`,
        [testname],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for Test
function updateTest(req,res)
{
    const {id}=req.params
    const {testname}=req.body
    db.query("Update test set testname=? where test_id=?",[testname,id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({message:"Record updated successfully"})
    })
}

//delete query for test
function removeTest(req,res)
{
    const {id}=req.params
    db.query("Update test set isActive=0 where test_id=?",[id],(err)=>
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
    getAllTest,
    getTestById,
    insertTest,
    updateTest,
    removeTest
}