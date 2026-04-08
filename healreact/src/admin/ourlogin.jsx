import { useState ,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Dash.css"; // optional for custom styles
import axios from "axios";
import { useNavigate  } from "react-router-dom";

const APIPOINT="http://localhost:5000/api/admin/";

function Dashboard() {
  const [v1,setv1]=useState('');
  const [v2,setv2]=useState('');
  const navigate = useNavigate(); 

 const checkadmin = async (e) => {
  e.preventDefault();   // ✅ Prevent page reload

  try {

    
    const res = await axios.post(APIPOINT, {
      email: v1,
      password: v2,
    });

    console.log("Message " + res.data.message);

    if (res.data.message === true) {
      console.log("Login Successfully");
      navigate("/docpro");
    } else {
      alert("Invalid User Or Password");
      setv1("");
      setv2("");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};
  return (
    <>
     <div className="login-container">
    <h2>Admin Login</h2>
    
    <form onSubmit={checkadmin}>
      <input type="text" 
             value={v1}  
             onChange={(e)=>{setv1(e.target.value)}}
             placeholder="Username or Email" required/>
      <input type="password" 
             value={v2}
             onChange={(e)=>{setv2(e.target.value)}}
             placeholder="Password" required/>
      <button>Login</button>
    </form>

  </div>

    </>
  
  
  )    
}

export default Dashboard    