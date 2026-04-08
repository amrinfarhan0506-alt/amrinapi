const db = require("../config/db")

// Select query for schemes
function getSchemeAll(req, res)
{
    db.query(`Select sc.scheme_id,
                     sc.scheme_name,
                     sc.scheme_type,
                     s.sname,
                     sc.description,
                     sc.link
              from schemes as sc
              inner join state as s on sc.sid = s.sid
              where sc.isActive = 1 and s.isActive = 1`,
    (err, result) =>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json(result)
    })
}


// Select query by id
function getSchemeById(req, res)
{
    const { id } = req.params

    db.query(`Select sc.scheme_id,
                     sc.scheme_name,
                     sc.scheme_type,
                     s.sname,
                     sc.description,
                     sc.link
              from schemes as sc
              inner join state as s on sc.sid = s.sid
              where sc.scheme_id = ? and sc.isActive = 1`,
    [id],
    (err, result) =>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        if(result.length == 0)
        {
            return res.json({ Message: "No Record Found" })
        }
        return res.json(result[0])
    })
}


// Insert query for schemes
function insertScheme(req, res)
{
    const { scheme_name, scheme_type, sid, description, link } = req.body

    db.query(`Insert into schemes
              (scheme_name, scheme_type, sid, description, link)
              values (?, ?, ?, ?, ?)`,
    [scheme_name, scheme_type, sid, description, link],
    (err) =>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({ Message: "Record inserted successfully" })
    })
}


// Update query for schemes
function updateScheme(req, res)
{
    const { id } = req.params
    const { scheme_name, scheme_type, sid, description, link } = req.body

    db.query(`Update schemes 
              set scheme_name = ?, 
                  scheme_type = ?, 
                  sid = ?, 
                  description = ?, 
                  link = ?
              where scheme_id = ?`,
    [scheme_name, scheme_type, sid, description, link, id],
    (err) =>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({ message: "Record updated successfully" })
    })
}


// Delete query for schemes (Soft Delete)
function removeScheme(req, res)
{
    const { id } = req.params

    db.query("update schemes set isActive = 0 where scheme_id = ?",
    [id],
    (err) =>
    {
        if(err)
        {
            return res.status(500).json(err)
        }
        return res.json({ Message: "Record deleted successfully" })
    })
}


module.exports =
{
    getSchemeAll,
    getSchemeById,
    insertScheme,
    updateScheme,
    removeScheme
}