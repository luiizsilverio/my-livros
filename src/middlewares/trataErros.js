import mongoose from "mongoose"
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

function trataErros(erro, req, res, next) {
  // console.log('ERRO ***', JSON.stringify(erro.errors, null, 2));

  if (erro instanceof mongoose.Error.CastError) { // erro de conversão
    return new RequisicaoIncorreta().enviarResposta(res);
  }

  if (erro instanceof mongoose.Error.ValidationError) { // erro de validação
    return new ErroValidacao(erro).enviarResposta(res);
  }

  return new ErroBase().enviarResposta(res);
}

export default trataErros;
