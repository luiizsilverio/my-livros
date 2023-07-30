import mongoose from "mongoose";

// Criar Schema
const livroSchema = new mongoose.Schema({
  // id: String,
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  editora: {
    type: String,
    required: true
  },
  paginas: Number
})

// Criar Model
const Livro = mongoose.model("livros", livroSchema);

export default Livro;
