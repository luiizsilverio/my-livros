import Editora from "../models/Editora.js";

class EditoraController {

  static listarEditoras = async (req, res) => {
    const editoras = await Editora.find().sort('nome');
    res.status(200).json(editoras);
  }

  static showEditora = async (req, res) => {
    const { id } = req.params;

    try {
      const editora = await Editora.findById(id);

      if (editora) {
        res.json(editora);
      }
      else {
        res.status(400).send('Editora não encontrada');
      }
    }
    catch (err) {
      res.status(400).send({
        message: "Erro ao localizar a editora",
        error: err.message
      });
    }
  }

  static cadastrarEditora = async (req, res) => {
    const newEditora = new Editora(req.body);
    try {
      const editora = await newEditora.save();
      res.status(201).json(editora);
    }
    catch (err) {
      res.status(500).send({
        message: "Erro ao criar a editora",
        error: err.message
      });
    }
  }

  static atualizarEditora = async (req, res) => {
    const { id } = req.params;

    const newEditora = { ...req.body };

    delete newEditora._id;

    try {
      const editora = await Editora.findByIdAndUpdate( id, { $set: newEditora });
      res.json(editora);
    }
    catch (err) {
      res.status(500).send({
        message: "Erro ao atualizar a editora",
        error: err.message
      });
    }
  }

  static excluirEditora = async (req, res) => {
    const { id } = req.params;

    try {
      await Editora.findByIdAndDelete(id);
      res.send("Editora removida com sucesso");
    }
    catch (err) {
      res.status(500).send({
        message: "Erro ao remover a editora",
        error: err.message
      });
    }
  }

}

export default EditoraController;
