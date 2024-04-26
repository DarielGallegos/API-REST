const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const especialidadController = require("../controllers/especialidadesController.js");

router
    .get("/", especialidadController.getAllRegister)
    .get("/:id_especialidad", especialidadController.getOneRegister)
    .post("/", bodyParser.json(), especialidadController.createNewRegister)
    .put("/", bodyParser.json(), especialidadController.updateOneRegister)
    .delete("/:especialidad_id", especialidadController.deleteOneRegister);


    
module.exports = router;