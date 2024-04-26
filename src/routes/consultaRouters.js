const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const consultaController = require("../controllers/consultasController.js");

router
    .get("/", consultaController.getAllRegister)
    .get("/:consulta_id", consultaController.getOneRegister)
    .post("/", bodyParser.json(), consultaController.createNewRegister)
    .put("/", bodyParser.json(), consultaController.updateOneRegister)
    .delete("/:consulta_id", consultaController.deleteOneRegister);


    
module.exports = router;