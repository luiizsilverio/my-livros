import { Livro } from "../models/index.js";
import NotFound from "../erros/NotFound.js";

function getFiltro(query) {
  const { editora, title, minPaginas, maxPaginas } = query;

  // 2 maneiras de fazer regex, uma pelo JS e outro pelo Mongoose
  // const regex = new RegExp(title, 'i');
  const regex = { $regex: title, $options: "i" }; // i = Case Insensitive

  const filtro = {};
  if (editora) filtro.editora = editora;
  if (title) filtro.title = regex;
  if (minPaginas || maxPaginas) filtro.paginas = {};
  if (minPaginas) filtro.paginas.$gte = minPaginas;
  if (maxPaginas) filtro.paginas.$lte = maxPaginas;
  return filtro;
}

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livros = await Livro.find()
        .populate('autor')
        .sort('title');

      res.status(200).json(livros);
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
      const filtro = getFiltro(req.query);

      const livros = await Livro.find(filtro)
        .populate('autor')
        .sort('title');

      res.status(200).json(livros);
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
