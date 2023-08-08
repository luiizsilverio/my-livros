import { Editora } from "../models/index.js";
import NotFound from "../erros/NotFound.js";

class EditoraController {

  static listarEditoras = async (req, res) => {
    const editoras = await Editora.find().sort('nome');
    res.status(200).json(editoras);
  }

  static showEditora = async (req, res, next) => {
    const { id } = req.params;

    try {
      const editora = await Editora.findById(id);

      if (editora) {
        res.json(editora);
      }
      else {
        next(new NotFound("Id da editora não encontrado."));
      }
    }
    catch (erro) {
      next(erro);
    }
  }

  static cadastrarEditora = async (req, res, next) => {
    const newEditora = new Editora(req.body);
    try {
      const editora = await newEditora.save();
      res.status(201).json(editora);
    }
    catch (erro) {
      next(erro);
    }
  }

  static atualizarEditora = async (req, res, next) => {
    const { id } = req.params;

    const newEditora = { ...req.body };

    delete newEditora._id;

    try {
      const editora = await Editora.findByIdAndUpdate( id, { $set: newEditora });

      if (editora) {
        res.json(editora);
      }
      else {
        next(new NotFound("Id da editora não encontrado."));
      }
    }
    catch (erro) {
      next(erro);
    }
  }

  static excluirEditora = async (req, res, next) => {
    const { id } = req.params;

    try {
      const editora = await Editora.findByIdAndDelete(id);

      if (editora) {
        res.json({
          message: "Editora removida com sucesso",
          status: 200
        })
      }
      else {
        next(new NotFound("Id da editora não encontrado."));
      }
    }
    catch (erro) {
      next(erro);
    }
  }

}

export default EditoraController;
