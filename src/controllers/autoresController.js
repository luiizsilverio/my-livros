import Autor from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    const autores = await Autor.find().sort('nome');
    res.status(200).json(autores);
  }

  static showAutor = async (req, res, next) => {
    const { id } = req.params;

    try {
      const autor = await Autor.findById(id);

      if (autor) {
        res.json(autor);
      }
      else {
        res.status(404).send({ message: 'Autor não encontrado' });
      }
    }
    catch (erro) {
      next(erro);
    }
  }

  static cadastrarAutor = async (req, res, next) => {
    const newAutor = new Autor(req.body);
    try {
      const autor = await newAutor.save();
      res.status(201).json(autor);
    }
    catch (erro) {
      next(erro);
    }
  }

  static atualizarAutor = async (req, res, next) => {
    const { id } = req.params;

    const newAutor = { ...req.body };

    delete newAutor._id;

    try {
      const autor = await Autor.findByIdAndUpdate( id, { $set: newAutor });
      res.json(autor);
    }
    catch (erro) {
      next(erro);
    }
  }

  static excluirAutor = async (req, res, next) => {
    const { id } = req.params;

    try {
      await Autor.findByIdAndDelete(id);
      res.send("Autor removido com sucesso");
    }
    catch (erro) {
      next(erro);
    }
  }

}

export default AutorController;
