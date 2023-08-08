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
  paginas: {
    type: Number,
    validate: {
      validator: (valor) => valor >= 0 && valor <= 5000,
      message: "O número de páginas deve estar entre 0 e 5000"
    }
    // min: [0, "O número de páginas deve estar entre 0 e 5000"],
    // max: [5000, "O número de páginas deve estar entre 0 e 5000"],
  },
}, {
  versionKey: false // para não retornar o campo "__v"
});

// Criar Model
const Livro = mongoose.model("livros", livroSchema);

export default Livro;
