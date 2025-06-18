import { useEffect, useState } from "react";
import API from "../api";

function DashboardUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "", role: "" });

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const startEdit = (user) => {
    setEditingId(user.user_id);
    setEditForm({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ username: "", email: "", role: "" });
  };

  const saveEdit = async (userId) => {
    try {
      await API.put(
        `/users/${userId}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        }
      );
      fetchUsers();
      cancelEdit();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-3">All Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="list-group">
          {users.map((u) => (
            <li key={u.user_id} className="list-group-item">
              {editingId === u.user_id ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-1"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  />
                  <input
                    type="email"
                    className="form-control mb-1"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                  <select
                    className="form-select mb-2"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(u.user_id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{u.username}</strong> — {u.email} — <em>{u.role}</em>
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(u)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.user_id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardUsers;