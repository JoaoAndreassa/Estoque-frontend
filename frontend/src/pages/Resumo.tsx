import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const Resumo = () => {
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);
  const [movimentacoes, setMovimentacoes] = useState<{ tipo: string; quantidade: number }[]>([]);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosRes = await axios.get("http://localhost:3000/api/produtos");
        setTotalProdutos(produtosRes.data.length);

        const estoqueRes = await axios.get("http://localhost:3000/api/estoque");
        let totalEstoque = 0;
        const movimentacoesMap = { entrada: 0, saida: 0 };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        estoqueRes.data.forEach((mov: any) => {
          if (mov.tipo === "entrada") movimentacoesMap.entrada += mov.quantidade;
          if (mov.tipo === "saida") movimentacoesMap.saida += mov.quantidade;
          totalEstoque += mov.tipo === "entrada" ? mov.quantidade : -mov.quantidade;
        });

        setMovimentacoes([
          { tipo: "Entradas", quantidade: movimentacoesMap.entrada },
          { tipo: "Saídas", quantidade: movimentacoesMap.saida },
        ]);

        setQuantidadeTotal(totalEstoque);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#007bff" }}>📊 Resumo do Estoque</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", flex: 1, margin: "10px" }}>
          <h3>Total de Produtos</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalProdutos}</p>
        </div>
        <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", flex: 1, margin: "10px" }}>
          <h3>Quantidade em Estoque</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{quantidadeTotal}</p>
        </div>
      </div>

      <h3 style={{ marginTop: "20px" }}>📊 Movimentações de Estoque</h3>
      <Chart
        type="bar"
        width="100%"
        height="300"
        series={[
          {
            name: "Quantidade",
            data: movimentacoes.map((m) => m.quantidade),
          },
        ]}
        options={{
          chart: { id: "estoque-movimentacoes" },
          xaxis: { categories: movimentacoes.map((m) => m.tipo) },
          colors: ["#28a745", "#dc3545"],
        }}
      />
    </div>
  );
};

export default Resumo;
