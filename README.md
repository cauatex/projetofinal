# Projeto Final de Programação Web - Sistema de Filmes

Este repositório contém o desenvolvimento do trabalho final da disciplina de Programação Web, que consiste na criação de um site de filmes, como o Ingresso.com e CineA.

### 🎯 Objetivo do Projeto
O objetivo principal deste trabalho é consolidar os fundamentos vistos em sala de aula na criação de uma aplicação web, e expandir o conhecimento do framework Next, escolhido pela equipe.

### 🎬 Tema do Sistema
Para aplicarmos os conceitos aprendidos na disciplina, será desenvolvido um sistema de pesquisa de filmes e armazenamento, a partir dos dados do filme, como nome, imagem e descrição. O projeto conta com integração com a API OMDb para obtenção de dados de filmes a partir dos títulos.
Os usuários conseguem fazer cadastro e login; adicionar, visualizar, editar ou deletar um filme do site; realizar o logout. O sistema armazena todos os dados inseridos pela API e pelo cadastro de usuários

### ⚙️ Tecnologias Utilizadas
| **Frontend** | Next.js |

| **Backend** | Next.js |

| **Dados** | Arquivos JSON | Utilizado para implementar o CRUD completo (Create, Read, Update, Delete). |

| **Autenticação** | JSON Web Tokens (JWT), jose | Necessário para rotas privadas. |

| **Validação** | Zod | Utilizada para validação do formulário. |

| **Menssagens de erro** | React-hot-toast | Utilizado nas telas de login e cadastro 

| **Integração com API** | Axios; OMDb API | Usados para adicionar filmes à base de dados |

| **Criptografia** | Bcrypt | Uilizado para criação e validação de senhas |

| **Sessão** | Cookies | Armazenamento e validação de sessão |

### 🖼️ Screenshots

Aqui estão algumas capturas de tela das principais funcionalidades:

* **Tela de Login e Cadastro**
  
* **Painel do Administrador (Listagem de Filmes)**
  
* **Formulário de Cadastro das informações do Filme**
  
* **Formulário de Atualização das informações do Filme**
  
### 🌐 Integração com API Externa

O projeto faz uso da API **OMDb API** ([https://www.omdbapi.com/](https://www.omdbapi.com/)).

* **Finalidade:** Obter informações detalhadas sobre filmes (como imagens e descrições) para enriquecer o recurso "Filme" do sistema.

### 🚀 Como Rodar o Projeto
Para executar este projeto em sua máquina local, siga as instruções abaixo:
1. Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina.
2. Instalação das Dependências
Abra o terminal na pasta raiz do projeto e execute o seguinte comando para baixar a pasta node_modules com todas as bibliotecas necessárias: npm i
3. Configuração de Ambiente (.env)
É necessário criar um arquivo chamado .env na raiz do projeto para configurar as chaves de API e tokens de autenticação.
Crie o arquivo e cole exatamente o seguinte conteúdo:
TOKEN=cdbc26f41828c2b779644572417ea17d92d3b09cff37148686e7daf0301c3ea200eb246e00f050ee3b460fec1e0e1799d1c9c549708a4f6460f81b9c94d30adc
NEXT_PUBLIC_OMDB_API_KEY=c4d00044

4. Executando o Projeto
Com as dependências instaladas e o ambiente configurado, inicie o servidor de desenvolvimento com o comando: npm run dev

### 👨‍💻 Equipe
* [CAUÃ TEIXEIRA GOMES VIEIRA](https://github.com/cauatex)
* [MELISSA VITORIA DOS SANTOS](https://github.com/melissavitoria25)

### 👨‍🏫 Professor
Nome do Professor: Phyllipe de Souza Lima Francisco <br>
Disciplina: Programação Web (XDES03) <br>
Instituição: UNIFEI (Universidade Federal de Itajubá) <br>
Semestre:  2025/2

### Observação
Este projeto tem finalidade estritamente acadêmica e de aprendizado.



