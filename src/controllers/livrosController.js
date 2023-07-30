import Livro from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    const livros = await Livro.find().sort('title');
    res.status(200).json(livros);
  }

}

export default LivroController;
