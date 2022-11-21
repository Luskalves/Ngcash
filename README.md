<h1> Ngcash </h1>

### Tópicos:
 <ul>
    <li> <a href="#dev_details"> Detalhes de desenvolvimento </a> </li>
    <li> <a href="#tech_details"> Detalhes técnicos </a> </li>
    <li> <a href="#file_struct"> Estrutura dos arquivos </a> </li>
    <li> <a href="#run_project"> Como rodar o projeto </a> </li>
 </ul>

<h2 id="dev_details"> Detalhes de desenvolvimento </h2>

### Sobre a API:

O projeto começou a ser desenvolvido pelo ```Backend```, com foco no desenvolvimento da API, o projeto em sua maior parte foi escrito utilizando ```Typescript```, e utilizando o Sequelize para se comunicar e popular o banco de dados. A API possuí 4 rotas distintas com seus respectivos metodos ```http``` e retornos, são elas as rotas de ```login```, ```register```, ```transactions``` e ```user```.

- A rota de ```login``` é responsável por validar se um usuário existe no banco e retornar um ```token``` caso o mesmo exista.
- A rota de ```register``` verifica se um usuário existe no banco de dados e se não existir cria um novo e retorna um ```token```.
- A rota de ```transactions``` é responsável por criar e gerenciar as transações, podendo retornar todas as transações do usuário, ou podendo retornar filtradas por data. No filtro de data também é possível filtrar as transações feitas/recebidas do usuário.
- A rota de ```user``` retorna as informações do usuário e também recebe depositos caso o usuário queira aumentar o seu saldo.    

### Sobre as Pastas:

#### Backend:
A pasta principal do projeto é a pasta ```src/```, pois nela estão todos os arquivos necessários para o funcionamento do projeto. 

- A pasta ```contollers/``` é onde estão os arquivos responsáveis por gerenciar as requisições para a API, fazendo a desconstrução do corpo das requisições e passando as informações para serem tratadas pelo ```service``` e retornando uma resposta para o usuário com um código ```HTTP``` referente ao estatus da requisição.
- Dentro da pasta database estão as subpastas: 
    -```config/```: Com o arquivo ```index.ts``` que cuida da conecção com o banco de dados,
    -```migrations/```: Com os arquivos estabelecendo os padrões que cada tabela deve trabalhar.
    -```models/```: Com os arquivos responsáveis por fazer a comunicação com o banco de dados.
    -```seeders/```: Com arquivos para popular o banco de dados com informações iniciasi.
- A pasta ```errors``` estão classes de erros personalizados com seus códigos e nomes referentes a erros ```HTTP```.
- A pasta ```interfaces/``` contem as interfaces e tipos utilizado para fazer a tipagem do retorno de metodos ou variáveis.
- A pasta ```middlewares/``` contem o middleware de erro que trata os erros disparados retornando o seu código e a mensagem de erro sem que seja necessário parar a API.
- A pasta ```models``` possuí as classes de cada requisição de uma rota específica e que utilizam os ```models``` dentro da pasta ```src/database/models/``` para fazer suas respectivas comunicações com o banco de dados.
- A pasta ```routes/``` tem os aqruivos com todas as rotas e com seus metodos de chamada.
- A pasta ```service/``` tem os arquivos que intermediam a comunicação da requisição com o banco de dados, fazendo o tratamento necesário tanto para a resposta quanto para a requisição ao banco de dados, garantindo que o valor retornado seja o esperado.
- A pasta ```tests/``` possui os testes unitários e simulações de entrada/resposta para os arquivos dentro das pastas de ```controllers/```,```services/``` e ```models/``` 

<h2 id="tech_details"> Detalhes técnicos </h2>
 
 ### Tecnologias utilizadas:
 
 ### ```Backend```:
 <details> 
    <summary> Typescript </summary> </br>
    Typescript foi a principal linguagem utilizada para desenvolver a parte de backend do projeto. Praticamente todas as dependências tando de produção quanto de desenvolvimento utilizam a linguagem.
 </details>
 
 <details>
    <summary> Javascript </summary> </br>
     O Javascript foi utilizado apenas para desenvolver as migrations e seeders dentro das pastas <strong>/src/database/migrations</strong> e <strong>/src/database/seeders</strong> Como a dependência de desenvolvimento <strong>sequelize-cli</strong> não suporta estes arquivos em Typescript a utilização da linguagem é necessária.
 </details>
 
 <details>
    <summary> Sequelize </summary> </br>
    Sequelize foi a ORM escolhida para fazer a comunicação com o banco de dados e a criação das tabelas.
 </details>
 
  <details>
    <summary> Sequelize-cli </summary> </br>
    O sequelize-cli é uma dependência de desenvolvimento utilizada para gerar automaticamente as migrations, models, seeders e config necessários para a comunicação e população de dados no banco utilizados pelo <strong>Sequelize</stong>.
 </details>
 
  <details>
    <summary> Ts-node </summary></br>
    É utilizado para rodar os arquivos escritos em Typescript sem a necessidade de transpilar o código para javascript primeiro.
 </details>
 
 <details>
    <summary> Express </summary></br>
    Express é o framework utilizado para criar a API onde gerencia as requisições e com base na roda retorna as respostas esperadas.
 </details>
 
  <details>
    <summary> Express-async-erros </summary> </br>
    Utilizado para capturar qualquer erro disparado na aplicação e enviar diretamente para o middleware de erro.
 </details>
 
 <details>
    <summary> Dotenv </summary></br>
    O Dotenv é usado para gerenciar as variáveis de ambiente definidas no Docker e/ou no arquivo <strong>.env</strong> na pasta do backend.
 </details>
 
 <details>
    <summary> Zod </summary></br>
    Zod é utilizado para validar o corpo das requisições, se elas correspondem ao tipo esperado delas. Exemplo de uso:
    
    import z from 'zod';
        
    const body = {
        username: "someName",
        passowrd :"somePass"
    }
    
    const userSchema = z.object({
      username: z.string().min(3),
      password: z.string().min(8)
    });
    
   const parsed = userSchema.safeParse(body);
   
   if (parsed.success) return "token";
   else throw new Error("usuário invalido!");
 </details>
 
 
 <details>
    <summary> JsonWebToken </summary> </br>
    Utilizado para gerar um token único para cada usuário novo/logado e validar se um token recebido é válido. 
 </details>
 
  <details>
    <summary> md5 </summary> </br>
    Uttilizado para encripitar as senhas do usuário antes de serem enviadas para o banco de dados.
 </details>
 
  <details>
    <summary> Postgres </summary> </br>
    Banco de dados utilizado para gerenciar e guardar as informações dos usuários.
 </details>
 
  <details>
    <summary>Mocha e Chai</summary> </br>
    Utilizados para fazer os testes unitários do projeto, validando se os metodos chamados retornam o esperado.
 </details>
 
  <details>
    <summary> Sinon </summary> </br>
    Utilizado nos testes para fazer uma simulação do retorno dos metodos sem que prejudique ou popule o banco de dados indevidamente.
 </details>
 
 
### ```Frontend```:


 <details>
    <summary> React </summary> </br>
    Biblioteca utilizada para desenvolver a interface de usuário, páginas e componentes da aplicação. 
 </details>
 
  <details>
    <summary> React router dom </summary> </br>
    Utilizado para gerenciar as rotas da aplicação.
 </details>
 
  <details>
    <summary> Axios </summary> </br>
    Utilizado para fazer as requisições para a API.
 </details>
 
  <details>
    <summary>Tailwind</summary> </br>
    Biblioteca utilizada para fazer a estilização da aplicação.
 </details>

<h2 id="file_struct"> Estrutura dos arquivos </h2>

#### Mapa dos arquivos de:
<details> 
<summary> Backend </summary> </br>

    ├── src/
    │   ├── controllers/
    │   │   ├── loginController.ts
    │   │   ├── registerController.ts
    │   │   ├── transactionsController.ts
    │   │   ├── userController.ts
    │   ├── database/
    │   │   ├── config/
    │   │   │   ├── config.ts
    │   │   ├── migrations/
    │   |   |   ├── 20221115162146-Accounts.js
    │   |   |   ├── 20221115194817-Users.js
    │   |   |   ├──20221115194831-Transactions.js
    │   |   ├── models/
    │   |   |   ├── Accounts.ts
    │   |   |   ├── index.ts
    │   |   |   ├── Transactions.ts
    │   |   |   ├── Users.ts
    │   |   ├── seeders/
    │   |   |   ├── 20221115175154-Accounts.js
    │   |   |   ├── 20221115195605-Users.js
    │   |   |   ├── 20221115195620-Transactions.js
    │   ├── errors/
    │   |   ├── BadRequest.ts
    │   |   ├── ConflicError.ts
    │   |   ├── NotFound.ts
    │   ├── interfaces/
    │   |   ├── models/
    │   |   |   ├── IRegister.ts
    │   |   ├── types/
    │   |   |   ├── CashType.ts
    │   |   ├── ITransactions.ts
    │   |   ├── IUsers.ts
    │   |   ├── IUserInfo.ts
    │   ├── middlewares/
    │   |   ├── errorMiddlerware.ts
    │   ├── models/
    │   |   ├── loginModel.ts
    │   |   ├── registerModel.ts
    │   |   ├── transactionsModel.ts
    │   |   ├── userModel.ts
    │   ├── routes/
    │   │   ├── loginRoute.ts
    │   │   ├── registerRoute.ts
    │   │   ├── transactionsRoute.ts
    │   │   ├── userRoute.ts
    │   ├── services/
    │   │   ├── loginServce.ts
    │   │   ├── registerService.ts
    │   │   ├── transactionsService.ts
    │   │   ├── userService.ts
    │   ├── tests/
    │   │   ├── mocks/
    │   │   │   ├── transactionsMocks;.ts
    │   │   │   ├── userMocks.ts
    │   │   ├── unit/
    │   │   │   ├── controllers/
    │   │   │   │   ├── loginController.test.ts
    │   │   │   │   ├── loginController.test.ts
    │   │   │   │   ├── transactionsController.test.ts
    │   │   │   │   ├── userController.test.ts
    │   │   │   ├── models/
    │   │   │   │   ├── loginModel.ts
    │   │   │   │   ├── registerModel.ts
    │   │   │   │   ├── transactionsModel.ts
    │   │   │   │   ├── userModel.ts
    │   │   │   ├── service/
    │   │   │   │   ├── loginService.ts
    │   │   │   │   ├── registerService.ts
    │   │   │   │   ├── transactionsService.ts
    │   │   │   │   ├── userService.ts
    ├── .dockerignore
    ├── .gitignore
    ├── .sequelizerc
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json

</details>

<details>
    <summary> Frontend </summary>
       
    ├── src/
    │   ├── api/
    │   │   ├── backendApi.js
    │   ├── components/
    │   │   ├── DoTransaction.js
    │   │   ├── GenericHeader.js
    │   │   ├── Header.js
    │   ├── context/
    │   │   ├── context.js
    │   │   ├── Provider.js
    │   ├── pages/
    │   │   ├── Deposit.js
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── NotFound.js
    │   │   ├── Register.js
    │   │   ├── Transactions.js
    │   ├── app.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   ├── reportWebVitals.js
    │   ├── setupTests.js
    ├── .dockerignore
    ├── .gitignore
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    ├── postcss.config
    ├── tailwind.config.js    
    
</details>


<h2 id="run_project"> Como rodar o projeto: </h2>

### Rodando com o docker:

  <ul>
    <li> Clone o repositório. </li>
    <li> Entre na pasta do projeto. </li>
    <li> Utilize o comando npm run compose:up para subir os containers e espere eles serem inicializados. </li>
    <li> Abra o navegador e acesse em <strong>localhost:3000</strong> ou clicando <a target="_blank" href="http://localhost:3000"> aqui </a>  para entrar na tela de login.</li>
  </ul>
  
### Rodando localmente:  

   - Clone o reposiório.
   - Entre na pasta do projeto.
   - Entre na pasta de ```backend/``` e instale as depêndencias com ```npm install``` em seguida use o comando ```npm start``` para iniciar a API.
   - Entre na pasta de ```frontend/``` e instale as depêndencias com ```npm install``` em seguida use o comando ```npm start``` para iniciar o front (é necessário que a API esteja rodando).

