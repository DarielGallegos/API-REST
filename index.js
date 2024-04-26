const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const path = require('path');

const doctorRoute = require('./src/routes/doctorRouters.js');
const medicamentoRoute = require('./src/routes/medicamentoRouters.js');
const clinicaRoute = require('./src/routes/clinicaRouters.js');
const consultaRoute = require('./src/routes/consultaRouters.js');
const pacienteRoute = require('./src/routes/pacienteRouters.js');
const horarioRoute = require('./src/routes/horarioRouters.js');
const especialidadRoute = require('./src/routes/especialidadRouters.js');

app.use("/api/clinica/doctores/", doctorRoute);
app.use("/api/clinica/medicamentos/", medicamentoRoute);
app.use("/api/clinica/clinicas/", clinicaRoute);
app.use("/api/clinica/consultas/", consultaRoute);
app.use("/api/clinica/pacientes/", pacienteRoute);
app.use("/api/clinica/horarios/", horarioRoute);
app.use("/api/clinica/especialidades/", especialidadRoute);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

app.use(express.static(path.join(__dirname+'/')));
app.get('/', (req, res) => {
    res.render("TablaMedicamentos.html");
});

app.listen(PORT, () => {console.log(`🚀 Server listening on port http://127.0.0.1:${PORT}`);});