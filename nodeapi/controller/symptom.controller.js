const db=require("../config/db")
//Select query for category
function getAllSym(req,res)
{
    db.query("select s.sym_id ,s.symptoms ,o.org_name from symptoms as s inner join organ as o on s.org_id=o.org_id where s.isActive=1",(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        return res.json(result);
    })
}
//Select query for category by id
function getSymById(req,res)
{
    const {id}=req.params
    db.query(`select s.symptoms ,o.org_id from symptoms as s inner join organ as o on s.org_id=o.org_id where sym_id=?`,[id],(err,result)=>
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

function insertSym(req,res)
{
    
    const {symptoms,org_id}=req.body
    db.query("insert into symptoms(symptoms,org_id) values(?,?)",[symptoms,org_id],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        return res.json({Message:"Record inserted successsfully"});
    })
}
//update query for category

function updateSym(req, res) {
    const { id } = req.params;
    const { symptoms, org_id } = req.body; // ✅ match frontend

    db.query(
        "UPDATE symptoms SET symptoms=?, org_id=? WHERE sym_id=?",
        [symptoms, org_id, id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.json({ Message: "Record updated successfully" });
        }
    );
}
//delete query for category
function removeSym(req,res)
{
    const {id}=req.params
    db.query("update symptoms set isActive=0 where sym_id=?",[id],(err)=>
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
    getAllSym,
    getSymById,
    insertSym,
    updateSym,
    removeSym
}