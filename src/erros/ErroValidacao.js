import ErroBase from "./ErroBase.js";

class ErroValidacao extends ErroBase {
  constructor(erro) {
    const mensagem = Object.values(erro.errors)
      .map(e => e.message)
      .join(" / ");

    super(mensagem, 400);
  }
}

export default ErroValidacao;
