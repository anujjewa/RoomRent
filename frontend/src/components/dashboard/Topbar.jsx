import "../../styles/Topbar.css";

function Topbar({ user }) {
  return (
    <header className="topbar">

      <div className="topbar-title">

        <h3>Dashboard</h3>

        <p>Welcome back, {user?.name}</p>

      </div>

      <div className="topbar-user">

        <div className="topbar-avatar">

          {user?.name?.charAt(0).toUpperCase()}

        </div>

        <div className="topbar-user-info">

          <h4>{user?.name}</h4>

          <p>{user?.role}</p>

        </div>

      </div>

    </header>
  );
}

export default Topbar;