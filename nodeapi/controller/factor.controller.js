const db = require("..config/db")

function getALl(req,res)
{
    db.query(`select f.fac_id,f.fac_name,c.cause_id
         from factor as f 
         inner join cause as c
         on c.cause_id=c.fac_id`)
}