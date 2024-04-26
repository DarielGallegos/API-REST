const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const clinicaController = require("../controllers/clinicasController.js");

router
    .get("/", clinicaController.getAllRegister)
    .get("/:clinica_id", clinicaController.getOneRegister)
    .post("/", bodyParser.json(), clinicaController.createNewRegister)
    .put("/", bodyParser.json(), clinicaController.updateOneRegister)
    .delete("/:clinica_id", clinicaController.deleteOneRegister);

module.exports = router;