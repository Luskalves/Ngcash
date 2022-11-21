<h1> Ngcash </h1>

### Tópicos:
 <ul>
    <li> <a href="#run_project"> Como rodar o projeto </a> </li>
    <li> <a href="#tech_details"> Detalhes técnicos </a> </li>
    <li> <a href="#dev_details"> Detalhes de desenvolvimento </a> </li>
    <li> <a href="#file_struct"> Estrutura dos arquivos </a> </li>
 </ul>
 
 
<h2 id="run_project"> Como rodar o projeto: </h2>

### Rodando com o docker

  <ul>
    <li> Utilize o comando npm run compose:up para subir os containers e espere eles serem inicializados. </li>
    <li> Abra o navegador e acesse em <strong>localhost:3000</strong> ou clicando <a href="http://localhost:3000" target="_blank"> aqui </a>  para entrar na tela de login.</li>
  </ul>
 
<h2 id="tech_details"> Detalhes técnicos </h2>
 
 ### Tecnologias utilizadas:
 
 #### Backend:
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
 
#### Frontend:

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

<h2 id="dev_details"> Detalhes de desenvolvimento </h2>
<h2 id="file_struct"> Estrutura dos arquivos </h2>

#### Mapa dos arquivos de:
<details> 
<summary> Backend </summary> </br>
estrutura: 

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
    │   │   │   │├── userMocks.ts
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
