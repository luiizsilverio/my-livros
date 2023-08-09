import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenarPor = "_id", ordem = -1 } = req.query;

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem); // 1 = crescente; -1 = decrescente
    // para ordem decrescente, informe menos "-" antes do campo ordenarPor

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado.find()
      // .sort({ [ordenarPor]: ordem })
        .sort(`${ordenarPor}`)
        .skip((pagina - 1) * limite)
        .limit(limite);

      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  }
  catch (erro) {
    next(erro);
  }
}

export default paginar;
