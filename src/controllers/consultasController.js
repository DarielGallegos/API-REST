const {getConnection} = require('../database/databaseORCL.js');

const getAllRegister = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM CONSULTAS ORDER BY CONSULTA_ID DESC");
    res.json(result.rows);
}

const getOneRegister = async (req, res) => {
    const connection = await getConnection();
    const {consulta_id} = req.params;
    const result = await connection.execute(`SELECT * FROM CONSULTAS WHERE CONSULTA_ID = ${consulta_id}`);
    if (result.rows.length === 0) {
        return res.status(404).send("Consulta no encontrado");
    }
    const consultaIndividual = result.rows[0];
    res.json(consultaIndividual);
}

const createNewRegister = async (req, res) => {
    try{
        const {consulta_motivo, consulta_estado, horario_id, paciente_id, doctor_id, clinica_id} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('INSERT INTO CONSULTAS(CONSULTA_MOTIVO, CONSULTA_ESTADO, HORARIO_ID, PACIENTE_ID, DOCTOR_ID, CLINICA_ID) VALUES(:consulta_motivo, :consulta_estado, :horario_id, :paciente_id, :doctor_id, :clinica_id)', [consulta_motivo, consulta_estado, horario_id, paciente_id, doctor_id, clinica_id]);
        await connection.commit();
        res.status(200).send({message: "POST: Insercion de datos ejectuada correctamente"});
    }catch(err){
        res.status(500).send(err.message);
    }
}

const updateOneRegister = async (req, res) => {
    try{
        const {consulta_motivo, consulta_estado, horario_id, paciente_id, doctor_id, clinica_id, consulta_id} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('UPDATE CONSULTAS SET CONSULTA_MOTIVO = :consulta_motivo, CONSULTA_ESTADO = :consulta_estado, HORARIO_ID = :horario_id, PACIENTE_ID = :paciente_id, DOCTOR_ID = :doctor_id , CLINICA_ID = :clinica_id WHERE CONSULTA_ID = :consulta_id', [consulta_motivo, consulta_estado, horario_id, paciente_id, doctor_id, clinica_id, consulta_id]);
        await connection.commit();
        res.status(200).send({message: "PUT: Actualizacion de datos ejectuada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    }
}

const deleteOneRegister = async (req, res) => {
    try{
        const {consulta_id} = req.params;
        const connection = await getConnection();
        const result = await connection.execute(`UPDATE CONSULTAS SET CONSULTA_STATUS = '0' WHERE CONSULTA_ID = ${consulta_id}`);
        await connection.commit();
        res.status(200).send({message : "DELETE: Eliminacion de registro ejecutada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllRegister,
    getOneRegister,
    createNewRegister,
    updateOneRegister,
    deleteOneRegister,
};