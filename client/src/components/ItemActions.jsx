import '../styles/ItemActions.css';

function ItemActions({ item, onDelete, onEdit }) {
  return (
    <div className="item-actions">
      <button onClick={() => onEdit(item)}>Edit</button>
      <button onClick={() => onDelete(item.item_id)}>Delete</button>
    </div>
  );
}

export default ItemActions;