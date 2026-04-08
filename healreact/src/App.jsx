import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./pages/index";
import Contact from "./pages/contact";
import Category from "./pages/category";
import Login from "./pages/admin/login";
import Dashboard from "./pages/admin/dashboard";
import Addservice from "./pages/admin/addservice";

function App() {
  return (
    <>
    <BrowserRouter>
      <nav style={navStyle}>
        <Link to="/">Home</Link>
        <Link to="/category/addservices">Category</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin/login">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/services" element={<Addservice />} />
        
      </Routes>
      </BrowserRouter>

    </>
  );
  
}

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "15px",
  background: "#222",
};

export default App;