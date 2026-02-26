import { useState, useEffect } from 'react'
import axios from 'axios'


const API="http://localhost:5000/api/docpro"
const doctor_img="http://localhost:5000/doctor_image/"

function Docpro()
{
    const [dimg,setdimg]=useState([])
    const getDoctor=async()=>{
    const res=await axios.get(API);
    console.log("Api response",res.data)
    setdimg(res.data)
  }
useEffect(() => {
  getDoctor();
}, []);

    return(
        <>
       <h1>Doctor Image</h1>
      {
      dimg.length>0?(
        dimg.map((d)=>( 
          <div Key={d.dpro_id}>
          <img src={doctor_img+d.doc_img} alt="Dr Anil Sharma" />
        <h3>{d.dname}</h3>
      <p><strong>Profile:</strong> General Physician</p>
      <p><strong>Qualification:</strong> {d.quali}</p>
      <p><strong>Experience:</strong>{d.exp}</p>
      <p>Expert in treating fever, infections, diabetes, and blood pressure with patient‑focused care.</p>
    
        </div>

        ))
      ):(<div>No record</div>)
  
      
   
      }
  </>
    )
}
export default Docpro