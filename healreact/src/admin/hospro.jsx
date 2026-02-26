import { useState, useEffect } from 'react'
import axios from 'axios'

const API="http://localhost:5000/api/hospro"
const hospital_img="http://localhost:5000/hospital_image/"
function Hospro() {

  const [hpimg,sethpimg]=useState([]) 

  const getHospital=async()=>{
    const res=await axios.get(API);
    console.log("Api response",res.data)
    sethpimg(res.data)
  }
useEffect(() => {
  getHospital();
}, []);
  return (
    <>
      <h1>Hospital Image</h1>
      <div className='row'>
        {
          hpimg.length>0?(
            hpimg.map((h)=>(
              <div className='col-md-4' 
              key={h.hpro_id}>
                <div className='card'>
                  <div className='card-header'>
                      one
                  </div>
                  <img
                  src={hospital_img+h.hp_img}
                  alt='hospital'/>
                  <div className='card-body'>
                    two
                  </div>
                  <div className='card-footer'>
                    three
                  </div>
                </div>
              </div>
            ))
          ):(<div>No record found </div>)
        }
      </div>
    </>
  )
}

export default Hospro
