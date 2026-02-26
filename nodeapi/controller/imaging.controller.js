const db = require("../config/db")

function getAllimaging(req,res)
{
    db.query( `Select  i.imgname,i.imginfo,i.imgpic,h.hospitalname
         from imagingtest as i
         inner join hospital h on i.imgid = h.hpid`,
        (err,result)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.json(result)
        }
    )
}
function getimagingById(req,res)
{
    const {id}=req.params
    db.query(
        `Select i.imgname, i.imginfo, i.imgpic, h.hospitalname
         from imaging_test as i
         Inner join hospital as h
         On i.imgid = h.hpid
         where i.imgid=?`,
        [id],
        (err,result)=>
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
        }
    )
}function insertimaging(req,res)
{
    const {img_name,img_info,img_pic,hp_id,createdOn,createdBy,updatedOn,updatedBy,isActive}=req.body

    db.query(`Insert into imaging_test(img_name,img_info,img_pic,hp_id,createdOn,createdBy,updatedOn,updatedBy,isActive)
         values(?,?,?,?,?,?,?,?,?)`,
        [img_name,img_info,img_pic,hp_id,createdOn,createdBy,updatedOn,updatedBy,isActive],
        (err,result)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.json({Message:"Imaging Test Added",insertId:result.insertId})
        }
    )
}
function updateImaging(req,res)
{
    const {id}=req.params
    const {img_name,img_info,img_pic,hp_id,updatedOn,updatedBy,isActive}=req.body

    db.query(
        `Update imaging_test set img_name=?,img_info=?,img_pic=?,hp_id=?,updatedOn=?,updatedBy=?,isActive=? where img_id=?`,
        [img_name,img_info,img_pic,hp_id,updatedOn,updatedBy,isActive,id],
        (err,result)=>
        {
            if(err)
            {
                return res.status(500).json(err)
            }
            return res.json({Message:"Imaging Test Updated"})
        }
    )
}
function deleteImaging(req,res)
{
    const {id}=req.params
    db.query('Delete from imaging_test where img_id=?',[id],(err,result)=>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({Message:"Imaging Test Deleted"})
    })
}
module.exports=
{
    getAllimaging,
    getimagingById,
    insertimaging,
    updateImaging,
    deleteImaging
}