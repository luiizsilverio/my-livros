import mongoose from "mongoose";

// Criar Schema
const livroSchema = new mongoose.Schema({
  // id: String,
  title: {
    type: String,
    required: [true, "O título é obrigatório"],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "O autor é obrigatório"],
    ref: 'autores'  // referencia a tabela autores
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória"],
  },
  paginas: Number
}, {
  versionKey: false // para não retornar o campo "__v"
});

// Criar Model
const Livro = mongoose.model("livros", livroSchema);

export default Livro;
