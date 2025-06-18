import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import "../styles/Form.css";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', form);
      const { user } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      setMessage(`Welcome, ${user.username}! Redirecting...`);
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/dashboard/users');
        } else {
          navigate('/dashboard/items');
        }
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p className="message">{message}</p>
      <p>Don't have an account? <a href="/register">Register here</a>.</p>
    </div>
  );
}

export default Login;