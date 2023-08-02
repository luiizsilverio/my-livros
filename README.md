# MY-LIVROS 📚

## Conteúdo
* [Sobre a Aplicação](#sobre-a-aplicação)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Iniciando a Aplicação](#car-Iniciando-a-aplicação)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre a aplicação
API desenvolvida em __Node.js__ que implementa um CRUD com banco de dados __MongoDB__.<br />
Possui 3 coleções: Livros, Autores e Editoras.
O banco de dados pode ser local ou na nuvem, com MongoDB Atlas. Para definir o banco na nuvem, informe as configurações do banco no arquivo __.env__.<br />
Desenvolvido durante o curso [Node.js: API Rest com Express e MongoDB](https://cursos.alura.com.br/course/nodejs-api-rest-express-mongodb), da Alura.
<br />

### Rotas da aplicação

| Método | Caminho da Rota | Descrição da Rota |
|---|---|---|
| GET | http://localhost:3000/livros | Retorna uma lista de livros |
| GET | http://localhost:3000/livros/busca | Procura um livro com critério definido nos Query Params |
| GET | http://localhost:3000/livros/:id | Procura um livro pelo Id |
| POST | http://localhost:3000/livros | Inclui novo livro |
| PUT | http://localhost:3000/livros/:id | Altera um livro |
| DELETE | http://localhost:3000/livros/:id | Exclui um livro |
| GET | http://localhost:3000/autores | Retorna uma lista de autores |
| GET | http://localhost:3000/autores/:id | Procura um autor pelo Id |
| POST | http://localhost:3000/autores | Inclui novo autor |
| PUT | http://localhost:3000/autores/:id | Altera um autor |
| DELETE | http://localhost:3000/autores/:id | Exclui um autor |
| GET | http://localhost:3000/editoras | Retorna uma lista de editoras |
| GET | http://localhost:3000/editoras/:id | Procura uma editora pelo Id |
| POST | http://localhost:3000/editoras | Inclui nova editora |
| PUT | http://localhost:3000/editoras/:id | Altera uma editora |
| DELETE | http://localhost:3000/editoras/:id | Exclui uma editora |
|

## :hammer_and_wrench: Tecnologias
* __NodeJS__
* __Mongoose__
* __Dotenv__

## :car: Iniciando a aplicação
O banco de dados MongoDB precisa estar instalado localmente ou definido no MongoDB Atlas.<br />
```bash
# Baixe o repositório com git clone e entre na pasta do projeto.
$ git clone https://github.com/luiizsilverio/my-livros.git

# Defina as configurações do banco no arquivo .env

# Instale as dependências
$ npm install

# Para iniciar a aplicação
$ npm start

# Abra http://localhost:3000 no navegador
```

## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**luiiz.silverio@gmail.com**](mailto:luiiz.silverio@gmail.com)
