import { useState } from 'react';
import '../styles/ItemForm.css';
import API from '../api';

function ItemForm({ onItemCreated, userId }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/items', { ...form, user_id: userId });
      onItemCreated(res.data);
      setForm({ title: '', description: '', location: '' });
    } catch (err) {
      console.error('Item creation failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h4>Create Item</h4>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default ItemForm;