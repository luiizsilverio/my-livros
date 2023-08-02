import mongoose from "mongoose";

// Criar Schema
const autorSchema = new mongoose.Schema({
  // id: String,
  nome: {
    type: String,
    required: true
  },
  nacionalidade: String,
},
{
  versionKey: false // para não retornar o campo "__v"
});

// Criar Model
const Autor = mongoose.model("autores", autorSchema);

export default Autor;
