const db=require("../config/db")
function getAll(req,res)
 {
    db.query(`select c.catname,d.dname 
        from category as c 
        inner join diseases as d on c.catid = d.catid `,(err,result)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.json(result)
        })
 }
function getDiseasesById(req,res)
{
    const {id}=req.params
    db.query(`select c.catname, d.dname, d.did
        from category as c 
        inner join diseases as d on c.catid = d.catid 
        where d.did=? `,[id],(err,result)=>
        {
            if(err)
            {
                return res.status(500).json(err)

            }
            if(result.length==0)
            {
                return res.json({MESSAGE:"NO RECORD FOUND"})
            }
            return res.json(result[0])
        })
}
function InsertDiseases(req,res)
{
    const{catid,dname,dis_intro,createdon,createdby,isActive}=req.body
    db.query(`insert into diseases(catid,dname,dis_intro,createdon,createdby,isActive)
        values(?,?,?,?,?,?)`,
        [catid,dname,dis_intro,createdon,createdby,isActive],(err)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.json({message:"Record inserted successfully"})
        })
}
function updateDiseases(req,res)
{
    const{id}=req.params
    const{dname}=req.body
    db.query(`update diseases set dname=? where did=?`,[dname,id],(err)=>{
        if(err)
        {
            return res.status(500).json
        }
        return res.json({message:"Update record successfully"})
    })
}
function removeDiseases(req,res)
{
    const{id}=req.params
    db.query(`delete from diseases where did=?`,[id],(err)=>{
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({message:"Record deleted successfully"})
    })
}



module.exports=
{
    getAll,
    getDiseasesById,
    InsertDiseases,
    updateDiseases,
    removeDiseases


}