const db=require("../config/db")
//Select query for hospital
function getAllDoc(req,res)
{
    db.query(`Select d.dname,d.email,d.exp,d.quali,h.hpname
        from doctor as d
        inner join hospital as h 
        on d.hpid=h.hpid`,(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}

//select query by id
function getDocById(req,res)
{
    const {id}=req.params
    db.query(`Select d.dname,d.email,d.exp,d.quali,h.hpname
        from doctor as d
        inner join hospital as h 
        on d.hpid=h.hpid
        where did=?`,[id],(err,result)=>
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
//insert query for doctor
function insertDoc(req,res)
{
    const {dname,email,contact,hpid,exp,spid,quali,createdon,createdby,updatedon,updatedby,isActive}=req.body
    db.query(`Insert into doctor(dname,email,contact,hpid,exp,spid,quali,createdon,createdby,updatedon,updatedby,isActive) 
        values(?,?,?,?,?,?,?,?,?,?,?,?)`,
        [dname,email,contact,hpid,exp,spid,quali,createdon,createdby,updatedon,updatedby,isActive],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for hospital
function updateDoc(req,res)
{
    const {id}=req.params
    const {dname,email,contact,
        hpid,exp,spid,quali,updatedon,updatedby,isActive}=req.body
    db.query(`Update doctor set dname=?,email=?,contact=?,
        hpid=?,exp=?,spid=?,quali=?,updatedon=?,updatedby=?,isActive=? where did=?`,[dname,email,contact,
        hpid,exp,spid,quali,updatedon,updatedby,isActive,id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record updated successfully"})
    })
}

//delete query for hospital
function removeDoc(req,res)
{
    const {id}=req.params
    db.query("Delete from doctor where did=?",[id],(err)=>
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
    getAllDoc,
    getDocById,
    insertDoc,
    updateDoc,
    removeDoc
}
/*
INSERT INTO `doctor` (`did`, `dname`, `email`, `contact`, `hpid`, `exp`, `spid`, `quali`, `createdon`, `createdby`, `updatedon`, `updatedby`, `isActive`) VALUES (NULL, 'Ruksar Kayamkhani', 'ruksar@gmail.com', '9824285561', '1', '5 years', '1', 'MBBS,MD in General Medicine', '2026-02-02', '1', '2026-02-07', '3', '1');
*/