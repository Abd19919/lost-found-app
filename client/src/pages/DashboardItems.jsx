import { useEffect, useState } from "react";
import API from "../api";

function DashboardItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", location: "" });
  const [newItem, setNewItem] = useState({ title: "", description: "", location: "" });
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchItems = async () => {
    try {
      const res = await API.get("/items", {
        headers: { Authorization: `Bearer ${storedUser.token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const canEdit = storedUser?.role === "admin";

  const handleCreate = async (e) => {
    e.preventDefault();
    const { title, description, location } = newItem;
    if (!title || !description || !location) return setError("All fields required");

    try {
      await API.post("/items", { ...newItem, user_id: storedUser.user_id }, {
        headers: { Authorization: `Bearer ${storedUser.token}` }
      });
      setNewItem({ title: "", description: "", location: "" });
      setError("");
      fetchItems();
    } catch (err) {
      console.error("Create error:", err);
      setError("Create failed");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.item_id);
    setEditForm({
      title: item.title,
      description: item.description,
      location: item.location,
    });
  };

  const handleEditSave = async (id) => {
    try {
      await API.put(`/items/${id}`, editForm, {
        headers: { Authorization: `Bearer ${storedUser.token}` },
      });
      setEditingId(null);
      setEditForm({ title: "", description: "", location: "" });
      fetchItems();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await API.delete(`/items/${id}`, {
        headers: { Authorization: `Bearer ${storedUser.token}` },
      });
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      (item?.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (item?.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="mb-3">All Items</h2>

      {/* Add Item Form */}
      <form onSubmit={handleCreate} className="mb-4">
        <div className="row g-2 align-items-end">
          <div className="col-md">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              placeholder="Location"
              className="form-control"
              value={newItem.location}
              onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
            />
          </div>
          <div className="col-md-auto">
            <button type="submit" className="btn btn-success">Add Item</button>
          </div>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* List */}
      {filteredItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul className="list-group">
          {filteredItems.map((item) => (
            <li key={item.item_id} className="list-group-item">
              {editingId === item.item_id ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-1"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  />
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleEditSave(item.item_id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.title}</strong> — {item.description} @ {item.location}
                    <br />
                    <small className="text-muted">By: {item.username}</small>
                  </div>
                  {canEdit && (
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.item_id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardItems;