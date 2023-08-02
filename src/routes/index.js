import livrosRouter from "./livrosRoutes.js";
import autorRouter from "./autoresRoutes.js";
import editoraRouter from "./editorasRoutes.js";

const routes = (app) => {

  app.route("/").get((req, res) => {
    res.status(200).send("API de livros 📚")
  })

  app.use(
    livrosRouter,
    autorRouter,
    editoraRouter
  );
}

export default routes;
