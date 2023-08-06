import NotFound from "../erros/NotFound.js";

function trataErro404(req, res, next) {

  const erro404 = new NotFound().enviarResposta(res);
  next(erro404);

}

export default trataErro404;
