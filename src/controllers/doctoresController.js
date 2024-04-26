const {getConnection} = require('../database/databaseORCL.js');

const getAllRegister = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM DOCTORES ORDER BY DOCTOR_ID DESC");
    res.json(result.rows);
}

const getOneRegister = async (req, res) => {
    const connection = await getConnection();
    const {doctor_id} = req.params;
    const result = await connection.execute(`SELECT * FROM DOCTORES WHERE DOCTOR_ID = ${doctor_id}`);
    if (result.rows.length === 0) {
        return res.status(404).send("Doctor no encontrado");
    }
    const doctor = result.rows[0];
    res.json(doctor);
}

const createNewRegister = async (req, res) => {
    try{
        const { doctor_nombre, doctor_identidad, doctor_direccion, especialidad_id, doctor_telefono, doctor_correo } = req.body;
        const connection = await getConnection();
        const result = await connection.execute('INSERT INTO DOCTORES(DOCTOR_NOMBRE, DOCTOR_IDENTIDAD, DOCTOR_DIRECCION, ESPECIALIDAD_ID, DOCTOR_TELEFONO, DOCTOR_CORREO) VALUES(:doctor_nombre, :doctor_identidad, :doctor_identidad, :especialidad_id, :doctor_telefono, :doctor_correo)', [doctor_nombre, doctor_identidad, doctor_direccion, especialidad_id, doctor_telefono, doctor_correo]);
        await connection.commit();
        res.status(200).send({message: "POST: Insercion de datos ejecutada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    }
}

const updateOneRegister = async (req, res) => {
    try{
        const{doctor_nombre, doctor_identidad, doctor_direccion, especialidad_id, doctor_telefono, doctor_correo, doctor_id} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('UPDATE DOCTORES SET DOCTOR_NOMBRE = :doctor_nombre , DOCTOR_IDENTIDAD = :doctor_identidad, DOCTOR_DIRECCION = :doctor_direccion, ESPECIALIDAD_ID = :especialidad_id, DOCTOR_TELEFONO = :doctor_telefono, DOCTOR_CORREO = :doctor_correo WHERE DOCTOR_ID = :doctor_id', [doctor_nombre, doctor_identidad, doctor_direccion, especialidad_id, doctor_telefono, doctor_correo, doctor_id]);
        await connection.commit();
        res.status(200).send({message: "PUT: Actualizacion de datos ejecutada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    }
}

const deleteOneRegister = async (req, res) => {
    try{
        const {doctor_id} = req.params;
        const connection = await getConnection();
        const result = await connection.execute(`UPDATE DOCTORES SET DOCTOR_STATUS = '0' WHERE DOCTOR_ID = ${doctor_id}`);
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