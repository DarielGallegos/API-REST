const {getConnection} = require('../database/databaseORCL.js');

const getAllRegister = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM PACIENTES ORDER BY PACIENTE_ID DESC");
    res.json(result.rows);
}

const getOneRegister = async (req, res) => {
    const connection = await getConnection();
    const {paciente_id} = req.params;
    const result = await connection.execute(`SELECT * FROM PACIENTES WHERE PACIENTE_ID = ${paciente_id}`);
    if(result.rows.length === 0){
        return res.status(404).send("Doctor no encontrado");
    }
    const paciente = result.rows[0];
    res.json(paciente);
}

const createNewRegister = async (req, res) => {
    try{
        const { paciente_nombre, paciente_identidad, paciente_edad, paciente_direccion, paciente_telefono, paciente_correo, paciente_genero ,paciente_tipo_sangre} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('INSERT INTO PACIENTES(PACIENTE_NOMBRE, PACIENTE_IDENTIDAD, PACIENTE_EDAD, PACIENTE_DIRECCION, PACIENTE_TELEFONO, PACIENTE_CORREO, PACIENTE_GENERO, PACIENTE_TIPO_SANGRE) VALUES(:paciente_nombre, :paciente_identidad, :paciente_edad, :paciente_direccion, :paciente_telefono, :paciente_correo, :paciente_genero, :paciente_tipo_sangre)', [paciente_nombre, paciente_identidad, paciente_edad, paciente_direccion, paciente_telefono, paciente_correo, paciente_genero, paciente_tipo_sangre]);
        await connection.commit();
        res.status(200).send({message: "POST: Insercion de datos ejecutada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    }
}

const updateOneRegister = async (req, res) => {
    try{
        const {paciente_nombre, paciente_identidad, paciente_edad, paciente_direccion, paciente_telefono, paciente_correo, paciente_genero ,paciente_tipo_sangre, paciente_id} = req.body;
        const connection = await getConnection();
        const result = await connection.execute('UPDATE PACIENTES SET PACIENTE_NOMBRE = :paciente_nombre, PACIENTE_IDENTIDAD = :paciente_identidad, PACIENTE_EDAD = :paciente_edad, PACIENTE_DIRECCION = :paciente_direccion, PACIENTE_TELEFONO = :paciente_telefono, PACIENTE_CORREO = :paciente_correo, PACIENTE_GENERO = :paciente_genero, PACIENTE_TIPO_SANGRE = :paciente_tipo_sangre WHERE PACIENTE_ID = :paciente_id', [paciente_nombre, paciente_identidad, paciente_edad, paciente_direccion, paciente_telefono, paciente_correo, paciente_genero ,paciente_tipo_sangre, paciente_id]);
        await connection.commit();
        res.status(200).send({message: "PUT: Actualizacion de datos ejecutada correctamente."});
    }catch(err){
        res.status(500).send(err.message);
    }
}

const deleteOneRegister = async (req, res) => {
    try{
        const {paciente_id} = req.params;
        const connection = await getConnection();
        const result = await connection.execute(`UPDATE PACIENTES SET PACIENTE_STATUS = '0' WHERE PACIENTE_ID = ${paciente_id}`);
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