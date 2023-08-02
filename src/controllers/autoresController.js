import Autor from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    const autores = await Autor.find().sort('nome');
    res.status(200).json(autores);
  }

  static showAutor = async (req, res) => {
    const { id } = req.params;

    try {
      const autor = await Autor.findById(id);

      if (autor) {
        res.json(autor);
      }
      else {
        res.status(400).send('Autor não encontrado');
      }
    }
    catch (err) {
      res.status(400).send({
        message: "Erro ao localizar o autor",
        error: err.message
      });
    }
  }

  static cadastrarAutor = async (req, res) => {
    const newAutor = new Autor(req.body);
    try {
      const autor = await newAutor.save();
      res.status(201).json(autor);
    }
    catch (err) {
      res.status(500).send({
        message: "Erro ao criar o autor",
        error: err.message
      });
    }
  }

  static atualizarAutor = async (req, res) => {
    const { id } = req.params;

    const newAutor = { ...req.body };

    delete newAutor._id;

    try {
      const autor = await Autor.findByIdAndUpdate( id, { $set: newAutor });
      res.json(autor);
    }
    catch (err) {
      res.status(500).send({
        message: "Erro ao atualizar o autor",
        error: err.message
      });
    }
  }

  static excluirAutor = async (req, res) => {
    const { id } = req.params;

    try {
      await Autor.findByIdAndDelete(id);
      res.send("Autor removido com sucesso");
    }
    catch (err) {
      res.status(500).send({
        message: "Erro ao remover o autor",
        error: err.message
      });
    }
  }

}

export default AutorController;
