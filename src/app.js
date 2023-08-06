import express from "express";
import db from "./database/index.js";
import routes from "./routes/index.js";
import trataErros from "./middlewares/trataErros.js";
import trataErro404 from "./middlewares/trataErro404.js";

db.on("error", console.log.bind(console, 'Erro de conexão'));

db.once("open", () => {
  console.log('BD conectado com sucesso');
})

const app = express();
app.use(express.json());

routes(app);

app.use(trataErro404);

app.use(trataErros);

export default app;
