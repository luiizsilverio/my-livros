import { Autor, Livro } from "../models/index.js";
import NotFound from "../erros/NotFound.js";

async function getFiltro(query) {
  const { editora, title, minPaginas, maxPaginas, nomeAutor } = query;

  // 2 maneiras de fazer regex, uma pelo JS e outro pelo Mongoose
  // - pelo JS: const regex = new RegExp(title, 'i');
  // - pelo Mongoose: const regex = { $regex: title, $options: "i" };
  const regex = { $regex: title, $options: "i" }; // i = Case Insensitive
  let filtro = {};

  if (editora) filtro.editora = editora;
  if (title) filtro.title = regex;

  if (minPaginas || maxPaginas) filtro.paginas = {};
  if (minPaginas) filtro.paginas.$gte = minPaginas;
  if (maxPaginas) filtro.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await Autor.findOne({ nome: nomeAutor });
    if (autor) {
      filtro.autor = autor._id;
    } else {
      filtro = null; // não achou
    }
  }

  return filtro;
}

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const resultado = Livro.find().populate('autor');

      req.resultado = resultado;

      next();
    }
    catch (erro) {
      next(erro);
    }
  }

  static showLivro = async (req, res, next) => {
    const { id } = req.params;

    try {
      const livro = await Livro.findById(id).populate('autor', 'nome');

      if (livro) {
        res.json(livro);
      }
      else {
        next(new NotFound("Id do autor não encontrado."));
      }
    }
    catch (erro) {
      next(erro);
    }
  }

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const filtro = await getFiltro(req.query);

      if (filtro) {
        const resultado = Livro.find(filtro).populate('autor');

        req.resultado = resultado;

        next();

      } else {
        res.status(200).send([]);
      }
    }
    catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    const newBook = new Livro(req.body);
    try {
      const livro = await newBook.save();
      res.status(201).json(livro);
    }
    catch (erro) {
      next(erro);
    }
  }

  static atualizarLivro = async (req, res, next) => {
    const { id } = req.params;

    const newBook = { ...req.body };

    delete newBook._id;

    try {
      // const livro = await Livro.findOneAndUpdate(
      //   { _id: id },
      //   { $set: newBook },
      //   { new: true }); // atualiza somente os campos passados no body

      const livro = await Livro.findByIdAndUpdate( id, { $set: newBook });

      if (livro) {
        res.json(livro);
      }
      else {
        next(new NotFound("Id do livro não encontrado."));
      }
    }
    catch (erro) {
      next(erro);
    }
  }

  static excluirLivro = async (req, res, next) => {
    const { id } = req.params;

    try {
      const livro = await Livro.findByIdAndDelete(id);

      if (livro) {
        res.json({
          message: "Livro removido com sucesso",
          status: 200
        })
      }
      else {
        next(new NotFound("Id do livro não encontrado."));
      }
    }
    catch (erro) {
      next(erro);
    }
  }

}

export default LivroController;
