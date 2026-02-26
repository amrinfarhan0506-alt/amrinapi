import axios from "axios";
import { useState } from "react"
import { useNavigate  } from "react-router-dom";

const APIPOINT="http://localhost:5000/api/admin/";
function Sarita()
{
    const[t1,sett1]=useState('');
    const[t2,sett2]=useState('');
    const navigate = useNavigate();   // ✅ inside component
    const checkadmin=async ()=>{
        
        const res = await axios.post(APIPOINT,{
            "email":t1,
            "password":t2
        })
        //console.log(res.data);
        if(res.data.message==true)
        {
            //alert("Login Successfully");
            navigate("/docpro");
        }
        else{
            alert("Invalid User Or Password");
            sett1('');
            sett2('');
        }
    }

    return(
      <>
      <h1 className="saniya">Sign In Form</h1>
      <div>
        <input type="text"
        value={t1}
        onChange={(e)=>{sett1(e.target.value)}}
        />
      </div>
      <div>
        <input type="password"
        value={t2}
        onChange={(e)=>{sett2(e.target.value)}}
        
        />
      </div>
      <div>
        <button onClick={checkadmin}>Sign In</button>
      </div>
      </>
    )
}

export default Sarita