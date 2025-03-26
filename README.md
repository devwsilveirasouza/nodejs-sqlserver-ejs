# Documentação: CRUD de Produtos com Node.js, EJS, Bootstrap 5 e SQL Server
## Este documento descreve o processo de desenvolvimento de um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de produtos utilizando tecnologias modernas.
### Tecnologias Utilizadas

- Back-end: Node.js com Express.js
- Front-end: Bootstrap 5 e Bootstrap Icons
- Template Engine: EJS (Embedded JavaScript)
- Banco de Dados: Microsoft SQL Server
- ORM/Query Builder: mssql (driver nativo)
- Outros: method-override para suporte a métodos HTTP PUT/DELETE

### Estrutura do Projeto

product-crud/
  ├── node_modules/              # Dependências instaladas
  ├── views/                     # Templates EJS
  │   ├── partials/              # Componentes reutilizáveis
  │   │   ├── header.ejs         # Cabeçalho HTML com CSS
  │   │   ├── footer.ejs         # Rodapé HTML com scripts
  │   │   └── navbar.ejs         # Barra de navegação
  │   ├── index.ejs              # Listagem de produtos
  │   ├── create.ejs             # Formulário de criação
  │   ├── edit.ejs               # Formulário de edição
  │   └── details.ejs            # Detalhes do produto
  ├── public/                    # Arquivos estáticos
  │   └── css/
  │       └── style.css          # Estilos customizados
  ├── routes/                    # Definição de rotas
  │   └── productRoutes.js       # Rotas para produtos
  ├── controllers/               # Lógica de negócio
  │   └── productController.js   # Controlador de produtos
  ├── models/                    # Acesso a dados
  │   └── db.js                  # Configuração do banco
  ├── app.js                     # Ponto de entrada da aplicação
  └── package.json               # Dependências e scripts

### Passo a Passo do Desenvolvimento
1. Inicialização do Projeto

# Criar diretório do projeto
- mkdir product-crud
- cd product-crud

# Inicializar um projeto Node.js
- npm init -y

# Instalar dependências
- npm install express ejs body-parser mssql method-override
- npm install nodemon --save-dev

2. Configuração do Banco de Dados
Criamos o arquivo models/db.js com:

Configuração de conexão com SQL Server
Script para criação automática da tabela produtos (se não existir)
Função para obter conexão com o banco de dados

#### A tabela possui a seguinte estrutura:

id (INT, PK, Identity)
name (NVARCHAR(100), NOT NULL)
description (NVARCHAR(255))
supplier (NVARCHAR(100))
categorie (NVARCHAR(100))
price (DECIMAL(10, 2), NOT NULL)
quantity_min (INT)
quantity_max (INT)
stock (INT, NOT NULL)

3. Criação do Controlador
O arquivo controllers/productController.js implementa as funcionalidades:

getAll: Lista todos os produtos
createForm: Renderiza formulário de criação
create: Salva novo produto
details: Exibe detalhes de um produto
editForm: Renderiza formulário de edição
update: Atualiza produto existente
delete: Remove produto do banco de dados

4. Definição das Rotas
O arquivo routes/productRoutes.js define os endpoints RESTful:

GET /: Lista todos os produtos
GET /create: Exibe formulário de criação
POST /create: Processa formulário de criação
GET /details/:id: Exibe detalhes do produto
GET /edit/:id: Exibe formulário de edição
PUT /edit/:id: Processa formulário de edição
DELETE /delete/:id: Remove produto

5. Desenvolvimento das Views (Templates)
Os templates EJS foram organizados em:

Partials: Componentes reutilizáveis (header, footer, navbar)
Páginas principais:

index.ejs: Tabela com listagem de produtos
create.ejs: Formulário para adicionar produto
edit.ejs: Formulário para editar produto
details.ejs: Visualização detalhada do produto



6. Configuração do App Principal
O arquivo app.js configura:

Express como framework web
EJS como template engine
Body-parser para processamento de formulários
Method-override para suporte a PUT/DELETE
Rotas da aplicação
Servidor HTTP na porta 3000

7. Estilização com Bootstrap 5

Utilizamos Bootstrap 5 via CDN para interface responsiva
Bootstrap Icons para elementos visuais
CSS customizado para refinamentos estéticos

Funcionalidades Implementadas
Listagem de Produtos

Tabela responsiva com ordenação
Botões de ação para cada produto
Mensagens de feedback após operações

Cadastro de Produtos

Formulário validado
Campos obrigatórios e opcionais
Interface amigável com agrupamentos lógicos

Visualização Detalhada

Layout em cards para melhor organização
Separação em informações básicas e de estoque
Botões para edição e exclusão

Edição de Produtos

Formulário preenchido com dados existentes
Validação de campos obrigatórios
Feedback visual

Exclusão de Produtos

Confirmação via JavaScript
Redirecionamento com mensagem de sucesso

Aspectos Técnicos Relevantes
Arquitetura MVC

Models: Interação com o banco de dados (db.js)
Views: Templates EJS para renderização
Controllers: Lógica de negócio separada

RESTful API

Uso de verbos HTTP apropriados (GET, POST, PUT, DELETE)
Rotas semânticas e intuitivas
Uso de method-override para compatibilidade com formulários HTML

Tratamento de Erros

Try/catch em operações assíncronas
Feedback visual ao usuário
Logs de erros no console

Segurança

Validação de dados no servidor
Parametrização de consultas SQL (evita SQL Injection)
Confirmação antes de operações destrutivas

Como Executar o Projeto

Clone ou baixe o repositório
Instale as dependências: npm install
Configure as credenciais do banco de dados em models/db.js
Execute o projeto: npm run dev
Acesse: http://localhost:3000

Considerações Finais
Este projeto demonstra a implementação de um CRUD completo utilizando tecnologias modernas do ecossistema JavaScript. A arquitetura segue boas práticas de desenvolvimento web, com separação de responsabilidades e código organizado.
O sistema pode ser facilmente expandido com novas funcionalidades como:

Autenticação de usuários
Filtragem e busca avançada
Paginação de resultados
Upload de imagens de produtos
Exportação para PDF/Excel