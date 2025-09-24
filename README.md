# Desafio Conector n8n - Gerador de Número Aleatório

Este projeto é uma solução para o desafio de desenvolvimento de um conector (node) personalizado para a plataforma de automação n8n. O conector se chama **Random** e sua função é gerar um número inteiro verdadeiramente aleatório utilizando a API pública do Random.org.

## Funcionalidades

-   **Operação "True Random Number Generator"**: Gera um número inteiro aleatório dentro de um intervalo definido.
-   **Parâmetros Configuráveis**: Permite ao usuário definir um valor `Mínimo` e `Máximo` para o sorteio.
-   **Ícone Personalizado**: Facilita a identificação do nó na interface do n8n.

## Pré-requisitos

Para executar este projeto localmente, você precisará ter os seguintes softwares instalados:

-   [Node.js](https://nodejs.org/) (v18 LTS ou superior)
-   [Docker](https://www.docker.com/get-started/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

---

## Instruções para Execução

Siga os passos abaixo para instalar as dependências e executar o serviço localmente usando Docker.

### 1. Instalar as Dependências e Compilar

Primeiro, clone este repositório para a sua máquina local.

```bash
git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
cd SEU-REPOSITORIO
Em seguida, entre na pasta do conector para instalar suas dependências e compilar o código TypeScript.

Bash

# Entre na pasta do conector
cd n8n-nodes-random

# Instale as dependências
npm install

# Compile o código de TypeScript para JavaScript
npm run build
2. Executar o Serviço com Docker
Após a compilação, volte para a pasta raiz do projeto e inicie os contêineres do n8n e do banco de dados PostgreSQL.

Bash

# Volte para a pasta raiz
cd ..

# Inicie os serviços em background (-d)
docker-compose up -d
O n8n estará rodando e acessível no seu navegador em http://localhost:5678.

Configuração do Ambiente
O arquivo docker-compose.yml já contém todas as variáveis de ambiente necessárias para a comunicação entre o n8n e o banco de dados.

Para um ambiente de produção, é altamente recomendável alterar a variável N8N_ENCRYPTION_KEY no arquivo docker-compose.yml para uma chave segura e aleatória.

Como Testar
Acesse a instância do n8n em http://localhost:5678.

Crie um novo workflow.

Clique no + para adicionar um novo nó e pesquise por "Random".

Adicione o nó ao seu workflow.

Nos parâmetros do nó, defina os valores de Min e Max desejados.

Clique em "Execute step" para rodar o nó.

Verifique a aba "Output": o resultado deverá ser um JSON contendo a chave randomNumber com o valor gerado.