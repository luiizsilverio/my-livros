import mongoose from "mongoose"

function trataErros(erro, req, res, next) {
  console.log(erro);
  if (erro instanceof mongoose.Error.CastError) { // erro de conversão
    return res.status(400).send({
      message: "ID da requisição incorreto",
    })
  }
  return res.status(500).send({
    message: "Erro interno no servidor"
  })
}

export default trataErros;
