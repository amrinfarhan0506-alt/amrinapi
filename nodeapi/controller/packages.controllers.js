const db = require("../config/db")

// Select all packages
function getAllPackages(req,res)
{
    db.query('Select * from packages',(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}


// Select package by id
function getPackageById(req,res)
{
    const {id}=req.params
    db.query('Select * from packages where pid=?',[id],(err,result)=>
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


// Insert package
function insertPackage(req,res)
{
    const {pname,no_of_test,test_id,fast,hp_id,reports,recommended,price}=req.body

    db.query('Insert into packages(pname,no_of_test,test_id,fast,hp_id,reports,recommended,price) values(?,?,?,?,?,?,?,?)',
        [pname,no_of_test,test_id,fast,hp_id,reports,recommended,price],
        (err,result)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.json({Message:"Package Added",insertId:result.insertId})
        }
    )
}


// Update package
function updatePackage(req,res)
{
    const {id}=req.params
    const {pname,no_of_test,test_id,fast,hp_id,reports,recommended,price}=req.body

    db.query('Update packages set pname=?,no_of_test=?,test_id=?,fast=?,hp_id=?,reports=?,recommended=?,price=? where pid=?',
        [pname,no_of_test,test_id,fast,hp_id,reports,recommended,price,id],
        (err,result)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.json({Message:"Package Updated"})
        }
    )
}


// Delete package
function deletePackage(req,res)
{
    const {id}=req.params
    db.query('Delete from packages where pid=?',[id],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Package Deleted"})
    })
}


module.exports={
    getAllPackages,
    getPackageById,
    insertPackage,
    updatePackage,
    deletePackage
}