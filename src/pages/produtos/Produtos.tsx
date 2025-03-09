import "../../styles/produto.css";
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
	const [menuAberto, setMenuAberto] = useState<number | null>(null);
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

	
	const handleDelete = async (id: number) => {
		if (window.confirm("Tem certeza que deseja excluir este produto?")) {
			try {
				await axios.delete(`http://localhost:3000/api/produtos/${id}`);
				setProdutos(produtos.filter((produto) => produto.id !== id));
			} catch (error) {
				console.error("Erro ao excluir produto:", error);
				alert("Erro ao excluir produto. Tente novamente!");
			}
		}
	};

	
	const handleReduceStock = async (id: number) => {
		const quantidade = parseInt(prompt("Quantos itens deseja remover do estoque?") || "0");
		if (quantidade <= 0) return;

		try {
			const response = await axios.patch(`http://localhost:3000/api/produtos/${id}/reduzir`, { quantidade });

			setProdutos(
				produtos.map((produto) =>
					produto.id === id ? { ...produto, quantidade: response.data.quantidade } : produto
				)
			);

			alert(`Removido ${quantidade} unidade(s) do produto!`);
		} catch (error) {
			console.error("Erro ao reduzir estoque:", error);
			alert("Erro ao reduzir estoque. Verifique se há quantidade suficiente!");
		}
	};

	
	const handleAddStock = async (id: number) => {
		const quantidade = parseInt(prompt("Quantos itens deseja adicionar ao estoque?") || "0");
		if (quantidade <= 0) return;

		try {
			const response = await axios.patch(`http://localhost:3000/api/produtos/${id}/adicionar`, { quantidade });

			setProdutos(
				produtos.map((produto) =>
					produto.id === id ? { ...produto, quantidade: response.data.quantidade } : produto
				)
			);

			alert(`Adicionado ${quantidade} unidade(s) ao estoque!`);
		} catch (error) {
			console.error("Erro ao adicionar ao estoque:", error);
			alert("Erro ao adicionar ao estoque. Tente novamente!");
		}
	};

	const handleEdit = (id: number) => {
		navigate(`/dashboard/produtos/${id}/editar`);
	};

	return (
		<div className="produtos-container">
		  <h2 className="titulo-produtos">📦 Lista de Produtos</h2>
		  <button
			className="btn-adicionar"
			onClick={() => navigate("/dashboard/produtos/novo")}
		  >
			➕ Adicionar Produto
		  </button>
	
		  {/* 
			Aqui envolvemos a <table> em uma <div> com estilo condicional:
			Se houver mais de 4 produtos, max-height = 300px e overflow-y = auto.
		  */}
		  <div
			style={{
			  maxHeight: produtos.length > 4 ? "300px" : "auto",
			  overflowY: produtos.length > 4 ? "auto" : "initial",
			  marginBottom: "20px",
			}}
		  >
			<table className="tabela-produtos">
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
							className="imagem-produto"
							src={
							  produto.imagem.startsWith("http")
								? produto.imagem
								: `http://localhost:3000${produto.imagem}`
							}
							alt={produto.name}
							width="60"
							height="60"
							onError={(e) =>
							  (e.currentTarget.src = "https://via.placeholder.com/50")
							}
						  />
						) : (
						  "Sem imagem"
						)}
					  </td>
					  <td>{produto.name}</td>
					  <td>{produto.descricao}</td>
					  <td className="valor-produto">R$ {produto.valor.toFixed(2)}</td>
					  <td>{produto.quantidade}</td>
					  <td className="acoes-container">
						<button
						  className="btn-acoes"
						  onClick={() =>
							setMenuAberto(menuAberto === produto.id ? null : produto.id)
						  }
						>
						  Ações
						</button>
	
						{menuAberto === produto.id && (
						  <div className="acoes-menu">
							<button
							  className="btn-add"
							  onClick={() => handleAddStock(produto.id)}
							>
							  ➕ Adicionar Estoque
							</button>
							<button
							  className="btn-reduce"
							  onClick={() => handleReduceStock(produto.id)}
							>
							  ➖ Remover Estoque
							</button>
							<button className="btn-edit" onClick={() => handleEdit(produto.id)}>
							  ✏️ Editar
							</button>
							<button
							  className="btn-delete"
							  onClick={() => handleDelete(produto.id)}
							>
							  ❌ Excluir
							</button>
						  </div>
						)}
					  </td>
					</tr>
				  ))
				) : (
				  <tr>
					<td colSpan={7} className="nenhum-produto">
					  Nenhum produto encontrado
					</td>
				  </tr>
				)}
			  </tbody>
			</table>
		  </div>
		</div>
	  );
};

export default Produtos;

