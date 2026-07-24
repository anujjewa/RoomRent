import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import "../styles/DashboardLayout.css";

function DashboardLayout({ children, user }) {

  return (

    <div className="dashboard-layout">

      <Sidebar user={user} />

      <div className="layout-body">

        <Topbar user={user} />

        <main className="layout-content">

          {children}

        </main>

      </div>

    </div>

  );

}

export default DashboardLayout;