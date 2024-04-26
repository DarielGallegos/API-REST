const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const pacienteController = require("../controllers/pacientesController.js");

router
    .get("/", pacienteController.getAllRegister)
    .get("/:paciente_id", pacienteController.getOneRegister)
    .post("/", bodyParser.json(), pacienteController.createNewRegister)
    .put("/", bodyParser.json(), pacienteController.updateOneRegister)
    .delete("/:paciente_id", pacienteController.deleteOneRegister);


    
module.exports = router;