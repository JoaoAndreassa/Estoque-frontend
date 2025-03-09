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
    <div className="novo-produto-container">
      <h2 className="novo-produto-title">➕ Adicionar Novo Produto</h2>

      <form onSubmit={handleSubmit} className="novo-produto-form">
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nome:"
          />
        </div>

        
        <div className="form-group">
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder="Descrição:"
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
            placeholder="Valor:"
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            placeholder="Quantidade:"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="URL da Imagem: https://exemplo.com/imagem.jpg"
          />
          {imagem && (
            <img
              src={imagem}
              alt="Pré-visualização"
              className="imagem-preview"
              onError={(e) =>
                (e.currentTarget.src = "https://via.placeholder.com/100")
              }
            />
          )}
        </div>

        <button type="submit" className="btn-cadastrar">
          📥 Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default NovoProduto;


