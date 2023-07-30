import express from "express";
import Livro from "../models/Livro.js";
import livrosRouter from "./livrosRoutes.js";

const routes = (app) => {

  app.route("/").get((req, res) => {
    res.status(200).send("API de livros 📚")
  })

  app.use(
    // express.json(),
    livrosRouter
  )
}

export default routes;
