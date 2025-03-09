import '../../styles/controleEstoque.css'
import { useEffect, useState } from "react";
import axios from "axios";

interface Movimentacao {
  id: number;
  tipo: string;
  quantidade: number;
  produto: { name: string };
  createdAt: string;
}

const ControleEstoque = () => {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [quantidadeEditada, setQuantidadeEditada] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchMovimentacoes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/estoque");
        setMovimentacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar movimentações de estoque:", error);
      }
    };

    fetchMovimentacoes();
  }, []);

  const formatarData = (data: string) => {
    const dataFormatada = new Date(data);
    return `${dataFormatada.toLocaleDateString()} às ${dataFormatada.toLocaleTimeString()}`;
  };


  const handleEdit = async (id: number) => {
    if (!quantidadeEditada[id]) return; 

    try {
      await axios.patch(`http://localhost:3000/api/estoque/${id}`, {
        quantidade: quantidadeEditada[id],
      });

      
      setMovimentacoes((prev) =>
        prev.map((mov) =>
          mov.id === id ? { ...mov, quantidade: quantidadeEditada[id] } : mov
        )
      );

      setEditandoId(null); 
    } catch (error) {
      console.error("Erro ao editar movimentação:", error);
      alert("Erro ao editar movimentação!");
    }
  };

  return (
    <div className="controle-estoque-container">
      <h2 className="controle-estoque-title">📋 Controle de Estoque</h2>

      <table className="controle-estoque-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.length > 0 ? (
            movimentacoes.map((mov) => (
              <tr key={mov.id}>
                <td>{new Date(mov.createdAt).toLocaleDateString()}</td>
                <td>{mov.produto.name}</td>

                
                <td
                  className={
                    mov.tipo === "entrada"
                      ? "estoque-entrada"
                      : "estoque-saida"
                  }
                >
                  {mov.tipo === "entrada" ? "🔼 Entrada" : "🔽 Saída"}
                </td>

                
                <td>
                  {editandoId === mov.id ? (
                    <input
                      className="estoque-edit-input"
                      type="number"
                      value={quantidadeEditada[mov.id] ?? mov.quantidade}
                      onChange={(e) =>
                        setQuantidadeEditada({
                          ...quantidadeEditada,
                          [mov.id]: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    mov.quantidade
                  )}
                </td>

               
                <td>
                
                  {formatarData(mov.createdAt)}
                  {editandoId === mov.id ? (
                    <button
                      className="btn-salvar"
                      onClick={() => handleEdit(mov.id)}
                    >
                      💾 Salvar
                    </button>
                  ) : (
                    <button
                      className="btn-editar"
                      onClick={() => setEditandoId(mov.id)}
                    >
                      ✏️ Editar
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhuma movimentação registrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ControleEstoque;
