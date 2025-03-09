
import '../styles/dashboard.css'
import { Outlet, Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
    navigate(0); 
  };

  return (
    <div className="dashboard-container">
     
      <nav className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/dashboard/resumo">📊 Resumo</Link>
          </li>
          <li>
            <Link to="/dashboard/produtos">📦 Produtos</Link>
          </li>
          <li>
            <Link to="/dashboard/estoque">📋 Controle de Estoque</Link>
          </li>
          <li>
            <button onClick={handleLogout}>🚪 Logout</button>
          </li>
        </ul>
      </nav>

    
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
