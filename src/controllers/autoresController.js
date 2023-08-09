import { Autor } from "../models/index.js";
import NotFound from "../erros/NotFound.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const resultado = Autor.find().sort('nome');

      req.resultado = resultado;

      next();

    } catch (erro) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static showAutor = async (req, res, next) => {
    const { id } = req.params;

    try {
      const autor = await Autor.findById(id);

      if (autor) {
        res.json(autor);
      }
      else {
        next(new NotFound("Id do autor não encontrado."));
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

      if (autor) {
        res.json(autor);
      }
      else {
        next(new NotFound("Id do autor não encontrado."));
      }
    }
    catch (erro) {
      next(erro);
    }
  }

  static excluirAutor = async (req, res, next) => {
    const { id } = req.params;

    try {
      const autor = await Autor.findByIdAndDelete(id);

      if (autor) {
        res.json({
          message: "Autor removido com sucesso",
          status: 200
        })
      }
      else {
        next(new NotFound("Id do autor não encontrado."));
      }
    }
    catch (erro) {
      next(erro);
    }
  }

}

export default AutorController;
