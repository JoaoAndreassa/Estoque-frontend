/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/resumoEstoque.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const Resumo = () => {
  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);
  const [valorTotalVendido, setValorTotalVendido] = useState(0);
  const [valorTotalEntradas, setValorTotalEntradas] = useState(0); 
  const [movimentacoes, setMovimentacoes] = useState<{ tipo: string; quantidade: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosRes = await axios.get("http://localhost:3000/api/produtos");
        const estoqueRes = await axios.get("http://localhost:3000/api/estoque");

        let valorEstoque = 0;
        let valorVendido = 0;
        let valorEntradas = 0; 
        const movimentacoesMap = { entrada: 0, saida: 0 };

        
        
        estoqueRes.data.forEach((mov: any) => {
          if (mov.tipo === "entrada") {
            movimentacoesMap.entrada += mov.quantidade;
            
           
            const produto = produtosRes.data.find((p: any) => p.id === mov.produtoId);
            if (produto) {
              valorEntradas += produto.valor * mov.quantidade;
            }
          }

          if (mov.tipo === "saida") {
            movimentacoesMap.saida += mov.quantidade;

            
            const produto = produtosRes.data.find((p: any) => p.id === mov.produtoId);
            if (produto) {
              valorVendido += produto.valor * mov.quantidade;
            }
          }
        });

        
        produtosRes.data.forEach((produto: any) => {
          valorEstoque += produto.valor * produto.quantidade;
        });

        setMovimentacoes([
          { tipo: "Entradas", quantidade: movimentacoesMap.entrada },
          { tipo: "Saídas", quantidade: movimentacoesMap.saida },
        ]);

        setValorTotalEstoque(valorEstoque);
        setValorTotalVendido(valorVendido);
        setValorTotalEntradas(valorEntradas);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="resumo-estoque-container">
      <h2 className="resumo-estoque-title">📊 Resumo do Estoque</h2>

      <div className="resumo-estoque-cards">
        <div className="resumo-estoque-card">
          <h3>Valor Total em Estoque</h3>
          <p className="resumo-estoque-value">R$ {valorTotalEstoque.toFixed(2)}</p>
        </div>
        <div className="resumo-estoque-card">
          <h3>Valor Total Vendido</h3>
          <p className="resumo-estoque-value">R$ {valorTotalVendido.toFixed(2)}</p>
        </div>
        <div className="resumo-estoque-card">
          <h3>Valor Total Do Estoque</h3> 
          <p className="resumo-estoque-value">R$ {valorTotalEntradas.toFixed(2)}</p>
        </div>
      </div>

      <h3 className="resumo-estoque-subtitle">📊 Movimentações de Estoque</h3>

      <Chart
        type="pie"
        width="100%"
        height="300"
        series={movimentacoes.map((m) => m.quantidade)}
        options={{
          labels: movimentacoes.map((m) => m.tipo),
          colors: ["#28a745", "#dc3545"],
          chart: { id: "estoque-movimentacoes" },
        }}
      />
    </div>
  );
};

export default Resumo;
