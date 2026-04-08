import { useEffect, useState } from "react";

const APIPOINT="http://localhost:5000/api/category"
function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(APIPOINT)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div style={container}>
      {categories.map((cat) => (
        <div key={cat.catid} style={card}>
          <h3>{cat.catname}</h3>
        </div>
      ))}
    </div>
  );
}

const container = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px",
  padding: "20px",
};

const card = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

export default Category;