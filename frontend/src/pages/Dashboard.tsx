import { Outlet, Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token
    navigate("/"); // Redireciona para a página de login
    navigate(0); // Força a atualização da tela
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Menu Lateral */}
      <nav style={{ width: "250px", background: "#333", color: "#fff", padding: "20px" }}>
        <h2>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/dashboard/resumo" style={{ color: "#fff", textDecoration: "none", display: "block", padding: "10px", borderRadius: "5px", background: "#444" }}>📊 Resumo</Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/dashboard/produtos" style={{ color: "#fff", textDecoration: "none", display: "block", padding: "10px", borderRadius: "5px", background: "#444" }}>📦 Produtos</Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/dashboard/estoque" style={{ color: "#fff", textDecoration: "none", display: "block", padding: "10px", borderRadius: "5px", background: "#444" }}>📋 Controle de Estoque</Link>
          </li>
          <li><button onClick={handleLogout} style={{ background: "red", color: "#fff", marginTop: "20px", border: "none", padding: "10px", cursor: "pointer" }}>🚪 Logout</button></li>
        </ul>
      </nav>

      {/* Área de Conteúdo */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Aqui será carregado o conteúdo das rotas internas */}
      </main>
    </div>
  );
};

export default Dashboard;
