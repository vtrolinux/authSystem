# Authentication Microservice
Este é um microserviço de autenticação, desenvolvido com Node.js 23, TypeScript (agora nativo do Node.js 23), MongoDB, Redis, Apache Kafka e Docker. O serviço gerencia o processo de autenticação, incluindo registro, login e verificação de e-mail, utilizando Kafka para garantir a comunicação assíncrona entre diferentes microserviços.

Funcionalidades
Autenticação de usuário: Suporte a login e registro com verificação de e-mail.

Verificação de e-mail: Envio de código de verificação de e-mail para garantir que o usuário tenha acesso ao e-mail fornecido.

Armazenamento de dados: MongoDB para persistência de dados de usuários e Redis para armazenamento temporário de códigos de verificação.

Como Rodar
Este projeto utiliza o Docker e o Docker Compose para facilitar o ambiente de desenvolvimento. Para rodar o projeto localmente, siga os seguintes passos:

Pré-requisitos
Docker: Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

Node.js 23: A versão 23 do Node.js é necessária para aproveitar o suporte nativo ao TypeScript.

Passo a Passo
Clone o repositório:

Primeiro, clone este repositório para a sua máquina local.

`git clone https://github.com/vtrolinux/authSystem.git`  
`cd authSystem`

Instale as dependências:

Depois de clonar o repositório, instale as dependências do projeto:

`npm install`  
Configuração do Docker Compose:

O projeto já inclui um arquivo docker-compose.yml que define os containers do Kafka, Zookeeper, MongoDB e Redis.

Arquivo docker-compose.yml
O Kafka está configurado para rodar na porta 9093.  
O MongoDB está configurado para rodar na porta 27017.  
O Redis está configurado para rodar na porta 6379.  
O Node.js roda como o microserviço de autenticação.  

Configuração das variáveis de ambiente:

Antes de rodar o projeto, é necessário configurar as variáveis de ambiente. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

```EXPRESS_PORT=3000

MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_DB_ADDRESS=
MONGO_DB_PORT=
MONGO_INITDB_DATABASE=

JWT_SECRET=
JWT_EXPIRE_IN=

CORS_DOMAIN=

MAILER_EMAIL_USER=
MAILER_EMAIL_PASSWORD=

REDIS_HOST=redis-container
REDIS_PORT=
REDIS_PASSWORD=

COMPOSE_BAKE=true
```

As variáveis podem variar dependendo de sua configuração, especialmente para a conexão com o Kafka, Redis e MongoDB. Certifique-se de que os valores correspondem às configurações do seu ambiente.

Suba os containers usando Docker Compose:

Para subir o ambiente de desenvolvimento, execute o seguinte comando:

`docker-compose up -d`  
Esse comando irá:

Subir os containers do MongoDB, Redis, Zookeeper e Kafka.

Inicializar o serviço Node.js.

Rodando o Projeto com TypeScript:

Para rodar o projeto com o Node.js 23, você pode utilizar o comando nativo do Node.js para executar o código TypeScript diretamente sem precisar de uma ferramenta como o tsc.

Para rodar o servidor em desenvolvimento (em modo watch), execute:

`npm run dev`

Este comando vai iniciar o serviço Node.js e permitir que ele rode o código TypeScript diretamente. O Node.js 23 cuidará da transpilação para JavaScript automaticamente durante a execução.

Se tudo for configurado corretamente uma mensagem como esta será exibida:

`💻 :SERVIDOR SENDO EXECUTADO NA PORTA: 3000`  
`✅ :redis conectado!`  
`✅ :mongoose conectado!`  

Verifique o Serviço Rodando:

Após executar o comando, o microserviço estará rodando. Você pode acessar os endpoints via localhost na porta configurada (por exemplo, localhost:3000 ou outra porta configurada no seu projeto).

Executando Testes
Você pode usar ferramentas como Postman ou Insomnia para testar os endpoints da API, como o login, registro e verificação de e-mail.

Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
