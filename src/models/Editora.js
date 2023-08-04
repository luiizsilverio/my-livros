import mongoose from "mongoose";

// Criar Schema
const editoraSchema = new mongoose.Schema({
  // id: String,
  nome: {
    type: String,
    required: [true, "O nome é obrigatório"]
  }
},
{
  versionKey: false // para não retornar o campo "__v"
});

// Criar Model
const Editora = mongoose.model("editoras", editoraSchema);

export default Editora;
