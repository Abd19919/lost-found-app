import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Lost & Found</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {storedUser && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/items">Items</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/map">Map</Link>
              </li>
              {storedUser.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/users">Users</Link>
                </li>
              )}
            </>
          )}
        </ul>
        <ul className="navbar-nav">
          {storedUser ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Hello, {storedUser.username}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login / Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;