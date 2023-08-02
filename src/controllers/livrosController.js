import Livro from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    const livros = await Livro.find()
      .populate('autor')
      .sort('title');

    res.status(200).json(livros);
  }

  static showLivro = async (req, res) => {
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
    catch (err) {
      res.status(400).send({
        message: "Erro ao localizar o livro",
        error: err.message
      });
    }
  }

  static listarLivrosPorEditora = async (req, res) => {
    const { editora } = req.query;

    const livros = await Livro.find({ editora })
      .populate('autor')
      .sort('title');

    res.status(200).json(livros);
  }

  static cadastrarLivro = async (req, res) => {
    const newBook = new Livro(req.body);
    try {
      const livro = await newBook.save();
      res.status(201).json(livro);
    }
    catch (err) {
      res.status(500).send({
        message: "Erro ao criar o livro",
        error: err.message
      });
    }
  }

  static atualizarLivro = async (req, res) => {
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
    catch (err) {
      res.status(500).send({
        message: "Erro ao atualizar o livro",
        error: err.message
      });
    }
  }

  static excluirLivro = async (req, res) => {
    const { id } = req.params;

    try {
      await Livro.findByIdAndDelete(id);
      res.send("Livro removido com sucesso");
    }
    catch (err) {
      res.status(500).send({
        message: "Erro ao remover o livro",
        error: err.message
      });
    }
  }

}

export default LivroController;
