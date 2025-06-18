import '../styles/Dashboard.css';

function DashboardLayout({ user, onLogout, form, list }) {
  return (
    <div className="dashboard-container container py-4">
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-3">
        <h2>Welcome, {user?.username}</h2>
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>
      {form}
      <hr />
      {list}
    </div>
  );
}

export default DashboardLayout;