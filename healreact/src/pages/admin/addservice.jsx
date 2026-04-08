import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Addservice() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [catname, setCatname] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/category"; // change if needed

  // ===============================
  // GET ALL CATEGORIES
  // ===============================
  const fetchCategories = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ===============================
  // ADD OR UPDATE CATEGORY
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (editId === null) {
      // POST
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catname,
          createdby: 1,
          updatedby: 1,
          createdon: today,
          updatedon: today,
        }),
      });
    } else {
      // PUT
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catname,
          updatedby: 1,
          updatedon: today,
        }),
      });
    }

    setCatname("");
    setEditId(null);
    fetchCategories();
  };

  // ===============================
  // DELETE CATEGORY
  // ===============================
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchCategories();
  };

  // ===============================
  // EDIT CATEGORY
  // ===============================
  const handleEdit = (cat) => {
    setCatname(cat.catname);
    setEditId(cat.catid);
  };

  // ===============================
  // NAVIGATION
  // ===============================
  const signout = () => {
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <h3>Admin Panel</h3>
        <button>Add Categories</button>
        <button>Add Home Content</button>
        <button onClick={signout}>Sign Out</button>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px", flex: 1 }}>
        <h1>Category Management</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter Category Name"
            value={catname}
            onChange={(e) => setCatname(e.target.value)}
            required
            style={{ padding: "8px", marginRight: "10px" }}
          />

          <button type="submit">
            {editId === null ? "Add Category" : "Update Category"}
          </button>
        </form>

        {/* Category Table */}
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Created On</th>
              <th>Updated On</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.catid}>
                <td>{cat.catid}</td>
                <td>{cat.catname}</td>
                <td>{cat.createdon}</td>
                <td>{cat.updatedon}</td>
                <td>
                  <button onClick={() => handleEdit(cat)}>Edit</button>
                  <button
                    onClick={() => handleDelete(cat.catid)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="5" align="center">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const sidebarStyle = {
  width: "200px",
  height: "100vh",
  background: "#333",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
};

export default Addservice;