import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/produtos/Produtos";
import EditarProduto from "./pages/produtos/EditarProduto";
import NovoProduto from "./pages/produtos/NovoProduto"; 
import ContorleEstoque from "./pages/estoque/Estoque";
import Resumo from "./pages/Resumo";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard com Sub-Rotas */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="resumo" element={<Resumo />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="produtos/novo" element={<NovoProduto />} />
          <Route path="produtos/:id/editar" element={<EditarProduto />} />
          <Route path="estoque" element={<ContorleEstoque />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
