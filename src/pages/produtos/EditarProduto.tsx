import '../../styles/editarProduto.css'
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
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/produtos/${id}`);
        const produto = response.data;
        setName(produto.name || "");
        setDescricao(produto.descricao || "");
        setValor(produto.valor?.toString() || "");
        setQuantidade(produto.quantidade?.toString() || "");
        setImagem(produto.imagem || "");
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
        imagem,
      });

      alert("Produto atualizado com sucesso!");
      navigate("/dashboard/produtos");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto");
    }
  };

  return (
    <div className="editar-produto-container">
      <h2 className="editar-produto-title">✏️ Editar Produto</h2>

      <form onSubmit={handleSubmit} className="editar-produto-form">
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <label>Valor:</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <label>Quantidade:</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        <label>URL da Imagem:</label>
        <input
          type="text"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
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

        <button type="submit" className="btn-salvar">
          💾 Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditarProduto;



