# Projeto Redlight

### Autor: João Guilherme Guedes Krichanã


## 1. Base de Dados

 - Applicants: Tabela que guarda informação referente aos applicants, sendo estas o nome, e-mail e telemóvel.
 - Roles: Tabela que guarda informação referente as roles, sendo estas o nome .
 - Applicants_roles: Tabela intermédia que guarda informação referente as tabelas citadas acima e o status do applicant em dada role .

## 2. Implementação

### 2.1 Página Inicial
Na página inicial o utilizador pode escolher entre dois botões, o "applicants" que o leva para outra página onde estão implementadas todas as funcionalidades referentes ao applicants e o "roles" que o leva para outra página onde estão implementadas todas as funcionalidades referentes as roles.

### 2.2 Página applicants
Nessa página estão implementadas todas as funcionalidades referentes aos applicants, é possível realizar as seguintes ações: pesquisá-los por nome usando a barra de pesquisa no canto superior direito, voltar a página inicial clicando em "Home" no canto superior esquerdo, criar um novo applicant no botão "create" que fica no meio da Navbar, clicar no perfil de cada applicant para ter uma visão mais detalhada, editar ou apagar as informações de cada um, uma vez que esteja dentro do perfil e ver as roles que lhe estão designadas.

### 2.3 Página roles
Aqui a Navbar possui as mesmas funcionalidades que na página anterior, é possível clicar em uma role para que posso ver os applicants que estão designados, editar o nome da role, mudar o status dos applicants e removê-los.

## 3 Tratamento de exceções
Está feita a proteção de erros em diversos campos, os nomes e emails não podem ser repetidos ou nulos, caso isso não ocorra, mostrado na tela ao redor do campo indicando qual foi o erro cometido.