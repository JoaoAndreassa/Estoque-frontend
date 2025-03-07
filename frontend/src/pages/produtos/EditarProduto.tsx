import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagem, setImagem] = useState(""); // 🔥 Agora editamos a URL da imagem

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/produtos/${id}`);
        const produto = response.data;
        setName(produto.name);
        setDescricao(produto.descricao);
        setValor(produto.valor.toString());
        setQuantidade(produto.quantidade.toString());
        setImagem(produto.imagem || ""); // 🔥 Garante que a URL da imagem seja carregada corretamente
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduto();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/produtos/${id}`, {
        name,
        descricao,
        valor,
        quantidade,
        imagem, // 🔥 Agora a imagem também pode ser alterada
      });

      navigate("/dashboard/produtos"); // Redireciona após edição
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };
  
  return (
    <div style={{ padding: "0", height:"100%", maxWidth: "500px", marginInline: "auto", background: "#fff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#007bff", marginBottom: "20px" }}>✏️ Editar Produto</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={{ fontWeight: "bold" }}>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
  
        <label style={{ fontWeight: "bold" }}>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd", height: "80px" }}
        />
  
        <label style={{ fontWeight: "bold" }}>Valor:</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
  
        <label style={{ fontWeight: "bold" }}>Quantidade:</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
  
        <label style={{ fontWeight: "bold" }}>URL da Imagem:</label>
        <input
          type="text"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
  
        {imagem && (
          <img
            src={imagem}
            alt="Pré-visualização"
            width="100"
            style={{ display: "block", marginTop: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
        )}
  
        <button
          type="submit"
          style={{
            padding: "12px",
            marginTop: "15px",
            background: "#007bff",
            color: "white",
            fontWeight: "bold",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          💾 Salvar Alterações
        </button>
      </form>
    </div>
  );
  
};

export default EditarProduto;


