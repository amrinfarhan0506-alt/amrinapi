const db=require("../config/db")
//Select query for hospital
function getAllHp(req,res)
{
    
    db.query(`
        select
        h.hpid, 
        h.hpname,
        c.ctname,
        h.hp_address,
        h.email,
        h.contact,
        h.regno
            from hospital as h
            inner join city as c
        on h.ctid = c.ctid
        where h.isActive=1`,(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.status(200).json(result)
    })
}

function getHpById(req,res)
{
    const {id}=req.params
    db.query(`Select h.hpname,h.hp_address,h.email,h.contact,
        h.regno,c.ctname from hospital as h inner join city as c on c.ctid=h.ctid where hpid=?`,[id],
        (err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        if(result.length==0)
        {
            return res.json({Message:"No record found"})
        }
        return res.json(result)
    })
}

//insert query for hospital
function insertHp(req,res)
{
    const {hpname,hp_address,email,contact,regno,ctid}=req.body
    db.query(`Insert into hospital(hpname,hp_address,email,contact,
        regno,ctid) 
        values(?,?,?,?,?,?)`,
        [hpname,hp_address,email,contact,regno,ctid],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record inserted successfully"})
    })
}
//update query for hospital
function updateHp(req,res)
{
    const {id}=req.params
   const { hpname, ctid, hp_address, email, contact, regno } = req.body
db.query(
  `UPDATE hospital SET hpname=?, hp_address=?, email=?, contact=?, regno=?, ctid=? WHERE hpid=?`,
  [hpname, hp_address, email, contact, regno, ctid, id],(err)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Record updated successfully"})
    })
}

//delete query for hospital
function removeHp(req,res)
{
    const {id}=req.params
    db.query("Update hospital set isActive=0 where hpid=?",[id],(err)=>
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
    getAllHp,
    getHpById,
    insertHp,
    updateHp,
    removeHp
}
