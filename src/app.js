import express from "express";
import db from "./database/index.js";
import Livro from "./models/Livro.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Erro de conexão'));

db.once("open", () => {
  console.log('BD conectado com sucesso');
})

const app = express();

app.use(express.json());

routes(app);

// const livros = [
//   {
//     id: 1,
//     title: "Entrevista com o Vampiro"
//   },
//   {
//     id: 2,
//     title: "1984"
//   }
// ]


// app.get('/', (req, res) => {
//   res.status(200).send("API de livros")
// })

app.get('/livros/:id', async (req, res) => {
  const { id } = req.params;
  const livro = await Livro.findOne({ _id: id });

  if (livro) {
    res.json(livro);
  }
  else {
    res.status(400).send('Livro não encontrado');
  }
})

app.post('/livros', (req, res) => {
  livros.push(req.body);
  res.status(201).send('Livro cadastrado com sucesso');
})

app.put('/livros/:id', (req, res) => {
  const { id } = req.params;
  const index = livros.findIndex(livro => livro.id == id);

  if (index >= 0) {
    livros[index].title = req.body.title;
    res.send('Livro atualizado com sucesso');
  }
  else {
    res.status(400).send('Livro não encontrado');
  }
})

app.delete('/livros/:id', (req, res) => {
  const { id } = req.params;
  const index = livros.findIndex(livro => livro.id == id);

  if (index >= 0) {
    livros.splice(index, 1);
    res.send('Livro excluído com sucesso');
  }
  else {
    res.status(400).send('Livro não encontrado');
  }
})

export default app;
