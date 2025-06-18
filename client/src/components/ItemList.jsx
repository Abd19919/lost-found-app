import { useState } from 'react';
import ItemActions from './ItemActions';
import EditItemForm from './EditItemForm';
import '../styles/ItemList.css';

function ItemList({ items, onDelete, onEditSubmit }) {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (item) => setEditingId(item.item_id);
  const handleCancel = () => setEditingId(null);

  return (
    <div className="item-list">
      <h4>Items</h4>
      {items.length === 0 ? (
        <p className="empty-message">No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.item_id}>
              {editingId === item.item_id ? (
                <EditItemForm
                  item={item}
                  onSave={(updated) => {
                    onEditSubmit(updated);
                    setEditingId(null);
                  }}
                  onCancel={handleCancel}
                />
              ) : (
                <>
                  <div className="item-info">
                    <strong>{item.title}</strong> — {item.description} ({item.location})
                  </div>
                  <ItemActions item={item} onDelete={onDelete} onEdit={handleEdit} />
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;