import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivros)
  .get("/livros/busca", LivroController.listarLivrosPorFiltro)
  .get("/livros/:id", LivroController.showLivro)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.listarLivrosPorFiltro)
  .delete("/livros/:id", LivroController.excluirLivro)

export default router;
