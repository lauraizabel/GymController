const express = require("express");
const routes = express.Router();
const instructors = require("./instructors");
//Home Page
routes.get("/", (req, res) => {
  return res.redirect("/instructors");
});

//Instructors
routes.get("/instructors", instructors.index);

//Fomulário
routes.get("/instructors/create", (req, res) => {
  return res.render("instructors/create");
});

//Listando os membros
routes.get("/members", () => {
  return res.send("member");
});

//Mostrar um instrutor
routes.get("/instructors/:id", instructors.show);

//edição de dados
routes.get("/instructors/:id/edit", instructors.edit);

//Recebendo os dados;
routes.post("/instructors", instructors.post);

//Salvando as edições
routes.put("/instructors", instructors.put);

//Excluindo um instrutor
routes.delete("/instructors", instructors.delete);

module.exports = routes;
