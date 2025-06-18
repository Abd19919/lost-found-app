import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegistering ? "/users/register" : "/users/login";
      const response = await API.post(endpoint, formData);
      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/items");
      }
    } catch (error) {
      alert("Login/Register failed. Check credentials.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <div className="mb-3">
              <label>Username</label>
              <input type="text" className="form-control" name="username" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Role</label>
              <select className="form-control" name="role" onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">
          {isRegistering ? "Sign Up" : "Login"}
        </button>
        <button type="button" className="btn btn-link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Login;