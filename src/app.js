import express from "express";
import db from "./database/index.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Erro de conexão'));

db.once("open", () => {
  console.log('BD conectado com sucesso');
})

const app = express();
app.use(express.json());
routes(app);

export default app;
