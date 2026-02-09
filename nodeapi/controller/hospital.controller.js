const db=require("../config/db")
//Select query for hospital
function getAllHp(req,res)
{
    db.query(`Select h.hpname,h.hp_address,h.email,h.contact,
        h.regno,c.ctname
        from hospital as h
        inner join city as c 
        on h.ctid=c.ctid`,(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}

//select query by id
function getHpById(req,res)
{
    const {id}=req.params
    db.query(`Select h.hpname,h.hp_address,h.email,h.contact,
        h.regno,c.ctname
        from hospital as h
        inner join city as c on h.ctid=c.ctid
        where hpid=?`,[id],(err,result)=>
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
    const {hp_name,ctid,hp_address,email,contact,regno,updatedon,updatedby,isActive}=req.body
    db.query(`Update hospital set hpname=?,hp_address=?,email=?,contact=?,
        regno=?,ctid=?,updatedon=?,updatedby=?,isActive=? where hpid=?`,[hp_name,ctid,hp_address,email,contact,regno,updatedon,updatedby,isActive,id],(err)=>
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
    db.query("Delete from hospital where hpid=?",[id],(err)=>
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