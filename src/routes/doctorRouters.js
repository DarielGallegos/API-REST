const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const doctorController = require("../controllers/doctoresController.js");

router
    .get("/", doctorController.getAllRegister)
    .get("/:doctor_id", doctorController.getOneRegister)
    .post("/", bodyParser.json(), doctorController.createNewRegister)
    .put("/", bodyParser.json(), doctorController.updateOneRegister)
    .delete("/:doctor_id", doctorController.deleteOneRegister);

    
module.exports = router;