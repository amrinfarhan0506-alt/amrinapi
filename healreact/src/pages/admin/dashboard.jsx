import { useState } from "react";

const cardData = [
  { title: "Symptom", desc: "Analyze lifestyle habits affecting your wellness." },
  { title: "User", desc: "Check symptoms and receive basic health suggestions." },
  { title: "Hospital", desc: "Create healthy daily routines for body and mind." },
  { title: "NGO", desc: "Analyze lifestyle habits affecting your wellness." },
  { title: "City", desc: "Analyze lifestyle habits affecting your wellness." },
  { title: "State", desc: "Analyze lifestyle habits affecting your wellness." },
  { title: "Category", desc: "Analyze lifestyle habits affecting your wellness." },
  { title: "Health risk", desc: "Analyze lifestyle habits affecting your wellness." },
  { title: "Booking", desc: "Analyze lifestyle habits affecting your wellness." },
];

const navItems = [
  "Dashboard", "Symptom", "User", "Hospital", "NGO",
  "City", "State", "Category", "Health risk", "Booking", "Profile", "Log out"
];

const styles = {
  body: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: "#dadace",
    color: "#333",
    overflow: "hidden",
  },
  sidebar: {
    width: "230px",
    minWidth: "230px",
    background: "#969485",
    color: "#fff",
    padding: "20px",
    overflowY: "auto",
    height: "100vh",
  },
  sidebarH2: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1c3622",
  },
  sidebarUl: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  sidebarLi: (isActive) => ({
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "8px",
    background: isActive ? "#87877b" : "transparent",
    color: "#fff",
    transition: "background 0.3s ease, color 0.3s ease",
  }),
  main: {
    flex: 1,
    padding: "25px",
    overflowY: "auto",
    height: "100vh",
  },
  welcome: {
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "10px",
    fontSize: "20px",
    marginBottom: "25px",
    border: "1px solid #87877b",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    borderTop: "4px solid #969485",
  },
  cardH3: {
    marginBottom: "10px",
    color: "#333",
    marginTop: 0,
  },
  cardP: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "15px",
  },
  cardBtn: {
    padding: "8px 18px",
    border: "none",
    background: "#969485",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s ease, color 0.3s ease",
  },
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredLi, setHoveredLi] = useState(null);

  const userName = "Admin";

  const handleOpen = (title) => {
    alert(`${title} module will open here 🚀`);
  };

  return (
    <div style={styles.body}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarH2}>HealNest</h2>
        <ul style={styles.sidebarUl}>
          {navItems.map((item) => (
            <li
              key={item}
              style={{
                ...styles.sidebarLi(activeNav === item),
                background:
                  activeNav === item || hoveredLi === item
                    ? "#87877b"
                    : "transparent",
              }}
              onClick={() => setActiveNav(item)}
              onMouseEnter={() => setHoveredLi(item)}
              onMouseLeave={() => setHoveredLi(null)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.welcome}>
          Welcome, <span>{userName}</span> 🌿
        </div>

        <div style={styles.cards}>
          {cardData.map((card, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.cardH3}>{card.title}</h3>
              <p style={styles.cardP}>{card.desc}</p>
              <button
                style={{
                  ...styles.cardBtn,
                  background: hoveredBtn === index ? "#f6c343" : "#969485",
                  color: hoveredBtn === index ? "#333" : "#fff",
                }}
                onMouseEnter={() => setHoveredBtn(index)}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => handleOpen(card.title)}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
