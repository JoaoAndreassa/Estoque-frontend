import '../../styles/novoProduto.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const NovoProduto = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/produtos", {
        name,
        descricao,
        imagem,
        valor: parseFloat(valor),
        quantidade: parseInt(quantidade),
      });

      alert("Produto adicionado com sucesso!");
      navigate("/dashboard/produtos");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto");
    }
  };

  return (
    <div>
      <h2>➕ Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Valor:</label>
          <input type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} required />
        </div>
        <div>
          <label>Quantidade:</label>
          <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
        </div>
        <div>
          <label>URL da Imagem:</label>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          {imagem && <img src={imagem} alt="Pré-visualização" width="100" style={{ display: "block", marginTop: "10px" }} />}
        </div>
        <button type="submit" style={{ background: "#007bff", color: "#fff", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "10px" }}>
          📥 Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default NovoProduto;


