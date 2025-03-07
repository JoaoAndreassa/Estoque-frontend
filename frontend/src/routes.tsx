import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/produtos/Produtos";
import NovoProduto from "./pages/produtos/NovoProduto";
import EditarProduto from "./pages/produtos/EditarProduto";
import Estoque from "./pages/estoque/Estoque";
import { JSX } from "react";

// Função para proteger rotas privadas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas dentro do Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route index element={<h2>📊 Resumo do Sistema</h2>} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="produtos/novo" element={<NovoProduto />} />
          <Route path="produtos/:id/editar" element={<EditarProduto />} />
          <Route path="estoque" element={<Estoque />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

