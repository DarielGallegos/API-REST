const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const horarioController = require("../controllers/horariosController.js");

router
    .get("/", horarioController.getAllRegister)
    .get("/:horario_id", horarioController.getOneRegister)
    .post("/", bodyParser.json(), horarioController.createNewRegister)
    .put("/", bodyParser.json(), horarioController.updateOneRegister)
    .delete("/:horario_id", horarioController.deleteOneRegister);
    
module.exports = router;