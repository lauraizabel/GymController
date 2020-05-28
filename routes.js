const express = require("express");
const routes = express.Router();
const instructors = require("./instructors");
//Home Page
routes.get("/", (res, req) => {
  return res.redirect(301, "/instructors");
});

//Instructors
routes.get("/instructors", (req, res) => {
  return res.render("instructors/index");
});

//Fomulário
routes.get("/instructors/create", (req, res) => {
  return res.render("instructors/create");
});

//Recebendo os dados;
routes.post("/instructors", instructors.post);

routes.get("/instructors/:id", instructors.show);

//Listando os membros
routes.get("/members", () => {
  return res.send("member");
});

//edição de dados
routes.get("/instructors/:id/edit", instructors.edit);

routes.put("/instructors", instructors.put);

module.exports = routes;
