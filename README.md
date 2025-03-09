# 🖥️ Frontend - Sistema de Controle de Estoque

Este é o **frontend** do sistema de controle de estoque, desenvolvido com **React.js**, **Vite**, e **TypeScript**. Ele fornece uma interface para gerenciar produtos, controlar o estoque e visualizar relatórios de movimentação.

---

## 🚀 **Tecnologias Utilizadas**
- **React.js** + **Vite** - Estrutura do frontend
- **React Router** - Navegação entre páginas
- **Axios** - Consumo da API
- **ApexCharts** - Gráficos e estatísticas
- **Styled Components / CSS Modules** - Estilização
- **TypeScript** - Tipagem segura

---

## 📌 **Como Rodar o Projeto**

### **1. Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/frontend-estoque.git
cd frontend
```
### **2. Instalar Dependências**
```sh
npm install
```

### **3. Iniciar o Servidor**
```sh
npm run dev
```

### **Se tudo estiver correto, a aplicação rodará em:**
```sh
http://localhost:5173

```

## Principais Funcionalidades

```sh
Login e Registro de Usuários
Gerenciamento de Produtos (CRUD completo)
Controle de Estoque (Entrada e Saída de Produtos)
Dashboard com Relatórios e Gráficos 📊
Exibição de Imagens de Produtos
```

##  Prints do Sistema
Tela de registro de usuario:
![alt text](<src/assets/cadastro.png>)

Tela de login:
![alt text](<src/assets/login.png>)

Ao fazer login é redirecionado a pagina inicial do sistema:
![alt text](<src/assets/produtoVazio.png>)

Após isso vai cadastrar um produto:
![alt text](<src/assets/adicionaProduto.png>)

Após a inclusão do produto no sistema, voltara automaticamente para a pagina inicial:
![alt text](<src/assets/listaProduto.png>)

Tela de resumo de estoque:
![alt text](<src/assets/resumo.png>)

tela de controle, com entrada e saida com data e hora:
![alt text](<src/assets/controleEstoque.png>)

### **Melhorias Futuras:**
```sh
Modo escuro (Dark Mode) 
PWA para acesso offline 
Mais estatísticas no dashboard 
Filtros avançados na listagem de produtos 

```