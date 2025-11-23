import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/theme.css";
import "../styles/component.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("bd_token"));

  const handleLogout = () => {
    localStorage.removeItem("bd_token");
    setIsLoggedIn(false); 
    navigate("/login"); 
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("bd_token"));
  }, [location]);

  return (
    <nav className="navbar">
      <h2 className="logo">BloodCare</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/search">Search</Link>
        <Link to="/request">Request</Link>

        {isLoggedIn ? (
          <Link
            to="/login"
            className="btn"
            style={{ padding: "6px 12px" }}
            onClick={handleLogout}
          >
            Admin Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="btn"
            style={{ padding: "6px 12px" }}
          >
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
}
