import Livro from "../models/Livro.js";

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
        res.status(400).send('Livro não encontrado');
      }
    }
    catch (erro) {
      next(erro);
    }
  }

  static listarLivrosPorEditora = async (req, res, next) => {
    try {
      const { editora } = req.query;

      const livros = await Livro.find({ editora })
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
      res.json(livro);
    }
    catch (erro) {
      next(erro);
    }
  }

  static excluirLivro = async (req, res, next) => {
    const { id } = req.params;

    try {
      await Livro.findByIdAndDelete(id);
      res.send("Livro removido com sucesso");
    }
    catch (erro) {
      next(erro);
    }
  }

}

export default LivroController;
