import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Produto {
  id: number;
  name: string;
  descricao: string;
  valor: number;
  quantidade: number;
  imagem?: string;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  // ✅ Função para excluir um produto
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:3000/api/produtos/${id}`);
        setProdutos(produtos.filter((produto) => produto.id !== id)); // 🔥 Remove o produto da lista
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto. Tente novamente!");
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>📦 Lista de Produtos</h2>
      <button
        onClick={() => navigate("/dashboard/produtos/novo")}
        style={{
          background: "#28a745",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ➕ Adicionar Produto
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>
                  {produto.imagem ? (
                    <img
                      src={produto.imagem.startsWith("http") ? produto.imagem : `http://localhost:3000${produto.imagem}`}
                      alt={produto.name}
                      width="50"
                      height="50"
                      style={{ borderRadius: "5px", border: "1px solid #ddd" }}
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/50")}
                    />
                  ) : (
                    "Sem imagem"
                  )}
                </td>
                <td>{produto.name}</td>
                <td>{produto.descricao}</td>
                <td style={{ fontWeight: "bold", color: "#28a745" }}>R$ {produto.valor.toFixed(2)}</td>
                <td>{produto.quantidade}</td>
                <td>
                  <button onClick={() => navigate(`/dashboard/produtos/${produto.id}/editar`)}>
                    ✏️ Editar
                  </button>
                  <button onClick={() => handleDelete(produto.id)}>❌ Excluir</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                Nenhum produto encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
};

export default Produtos;
