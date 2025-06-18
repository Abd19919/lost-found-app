import { useEffect, useState } from 'react';
import API from '../api';
import '../styles/UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  return (
    <div className="user-list">
      <h4>All Users</h4>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <strong>{user.username}</strong> — {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;