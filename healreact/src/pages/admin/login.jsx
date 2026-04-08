import { useState } from "react";
import { useNavigate } from "react-router-dom";
const APIPOINT="http://localhost:5000/api/admin"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(APIPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.message === true) {
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "300px",
};

export default Login;