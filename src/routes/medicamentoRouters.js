const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const medicamentoController = require("../controllers/medicamentosController.js");



router
    .get("/", medicamentoController.getAllRegister)
    .get("/:id_medicamento", medicamentoController.obtenerRegistroIndividual)
    .post("/", bodyParser.json() ,medicamentoController.createNewRegister)
    .put("/", bodyParser.json(), medicamentoController.updateOneRegister)
    .delete("/:medicamento_id", medicamentoController.deleteOneRegister);


    
module.exports = router;