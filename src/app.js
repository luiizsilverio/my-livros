import express from "express";
import db from "./database/index.js";
import routes from "./routes/index.js";
import trataErros from "./middlewares/trataErros.js";

db.on("error", console.log.bind(console, 'Erro de conexão'));

db.once("open", () => {
  console.log('BD conectado com sucesso');
})

const app = express();
app.use(express.json());

routes(app);

app.use(trataErros);

export default app;
